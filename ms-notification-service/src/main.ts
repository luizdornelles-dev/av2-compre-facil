import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // Configura o NestJS para rodar como um Microsserviço usando RabbitMQ
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://admin:123456@localhost:5672'], // URL que configuramos no Docker
      queue: 'payment_queue', // Nome da fila que ele vai "vigiar"
      queueOptions: {
        durable: false, // Fila simples para fins acadêmicos
      },
    },
  });

  await app.listen();
  console.log('🚀 Microservice Notification is listening...');
}
bootstrap();