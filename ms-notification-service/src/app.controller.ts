import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { PrismaService } from './prisma.service';

@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  // Este decorador diz ao NestJS para executar esta função sempre que
  // uma mensagem com o padrão 'payment_finished' aparecer na fila.
  @EventPattern('payment_finished')
  async handlePaymentFinished(@Payload() data: any) {
    console.log('📩 Nova mensagem recebida do RabbitMQ:', data);

    // Salva o log do e-mail no banco de dados de Notificação via Prisma
    const mail = await this.prisma.mail.create({
      data: {
        idUser: data.idUser,
        orderNumber: data.orderNumber,
        orderValue: data.orderValue,
        mailTo: `usuario_${data.idUser}@email.com`, // Email simulado
        subject: 'Confirmação de Pagamento - CompreFácil',
        body: `Olá! Seu pagamento para o pedido #${data.orderNumber} no valor de R$ ${data.orderValue} foi confirmado com sucesso.`,
      },
    });

    console.log('✅ Log de e-mail salvo no banco de notificações:', mail.id);
  }
}
