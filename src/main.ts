import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Deletes unknown properties
      forbidNonWhitelisted: true, // Throws an error if unknown properties are found
      transform: true, // Automatically transforms payloads to DTOs
    }),
  ); // Enables global validation
  app.enableCors({
    origin: ['http://localhost:3000'],
    Credentials: true,
  }); // Enables CORS

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((error) => console.error(error));
