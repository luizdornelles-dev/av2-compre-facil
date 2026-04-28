import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // O pagamento roda na porta 3000 para recebermos requisições via Postman/Insomnia
  await app.listen(3000);
  console.log('🚀 API Payment is running on http://localhost:3000');
}
bootstrap();