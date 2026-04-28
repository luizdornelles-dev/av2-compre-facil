import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
    
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://admin:123456@localhost:5672'], // URL que configuramos no Docker
      queue: 'payment_queue',
      queueOptions: {
        durable: false, 
      },
    },
  });

  await app.listen();
  console.log('🚀 Microservice Notification is listening...');
}
bootstrap();