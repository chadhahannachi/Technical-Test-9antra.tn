import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: 'http://localhost:3000', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: 'Set-Cookie',
    allowedHeaders: ['Access-Control-Allow-Origin', 'Content-Type', 'Authorization'],
  });

  await app.listen(5000);
}
bootstrap();
