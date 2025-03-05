import { INestApplication, ValidationPipe } from '@nestjs/common';

export const globalPipesConfig = (app: INestApplication) => {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Deletes unknown properties
      forbidNonWhitelisted: true, // Throws an error if unknown properties are found
      transform: true, // Automatically transforms payloads to DTOs
    }),
  );
};
