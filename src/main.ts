import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Use this to validate threw dtos on our app
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
