import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.setGlobalPrefix('api');

  app.enableCors({
    origin: ['http://localhost:3000'],
    Credentials: true,
  });

  // Enables global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Deletes unknown properties
      forbidNonWhitelisted: true, // Throws an error if unknown properties are found
      transform: true, // Automatically transforms payloads to DTOs
    }),
  );

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('GymRat')
    .setDescription('The GymRat API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  const PORT = Number(configService.get<number>('port'));
  await app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Api Documentation running on http://localhost:${PORT}/api`);
  });
}
bootstrap().catch((error) => console.error(error));
