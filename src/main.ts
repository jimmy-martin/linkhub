import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Use this to validate threw dtos on our app
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip unnecessary properties from client requests
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Linkhub API')
    .setDescription(
      'API permettant de créer sa propre base de données de liens utiles codée avec le framework NestJS et Prisma comme ORM.',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}/`);
}
bootstrap();
