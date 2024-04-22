import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middlewares/logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
/* import { auth } from 'express-openid-connect';
import { config as auth0Config } from './config/auth0.config'; */

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(loggerGlobal);
  //app.use(auth(auth0Config));
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    // Este pipe valida que la información pasada por Body sea estrictamente la que está en el DTO
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('M4 eCommerce API - Sebastian Palomares')
    .setDescription(
      'API para el proyecto final de M4 eCommerce creada en NestJS - Backend ',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}

bootstrap();
