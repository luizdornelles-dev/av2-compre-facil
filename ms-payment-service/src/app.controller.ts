import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PrismaService } from './prisma.service';

@Controller('payments')
export class AppController {
  constructor(
    private readonly prisma: PrismaService,
    // Injetamos o "transmissor" do RabbitMQ que configuramos no app.module
    @Inject('PAYMENT_SERVICE') private client: ClientProxy,
  ) {}

  @Post()
  async createPayment(@Body() data: { idUser: string; orderNumber: number; orderValue: number }) {
    // 1. Salva o pagamento no Banco de Dados (PostgreSQL) via Prisma
    const payment = await this.prisma.creditCard.create({
      data: {
        idUser: data.idUser,
        orderNumber: data.orderNumber,
        orderValue: data.orderValue,
        paymentConfirmed: true, // Simulando que o pagamento foi aprovado
      },
    });

    console.log('✅ Pagamento salvo no banco!');

    // 2. Envia a mensagem para a fila do RabbitMQ
    // O "emit" dispara a mensagem e não fica esperando resposta (assíncrono)
    this.client.emit('payment_finished', payment);
    
    console.log('📨 Mensagem enviada para o RabbitMQ!');

    return {
      message: 'Pagamento processado com sucesso!',
      payment,
    };
  }
}