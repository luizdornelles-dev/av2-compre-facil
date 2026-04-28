import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PrismaService } from './prisma.service';

@Controller('payments')
export class AppController {
  constructor(
    private readonly prisma: PrismaService,
    
        @Inject('PAYMENT_SERVICE') private client: ClientProxy,
  ) {}

  @Post()
  async createPayment(@Body() data: { idUser: string; orderNumber: number; orderValue: number }) {
    
    const payment = await this.prisma.creditCard.create({
      data: {
        idUser: data.idUser,
        orderNumber: data.orderNumber,
        orderValue: data.orderValue,
        paymentConfirmed: true, // Simulando que o pagamento foi aprovado
      },
    });

    console.log('✅ Pagamento salvo no banco!');

   
    this.client.emit('payment_finished', payment);
    
    console.log('📨 Mensagem enviada para o RabbitMQ!');

    return {
      message: 'Pagamento processado com sucesso!',
      payment,
    };
  }
}