import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v2');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //Borra el key no definidos en los DTOs
      forbidNonWhitelisted: true, //Se activa la respuesta de error
      transform: true, //quiero que transforme esa informacion que fluye por los DTOs
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  await app.listen(process.env.PORT);
}
bootstrap();
