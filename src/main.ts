import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { swaggerConfig } from './options/swagger.config';
import { globalPipesConfig } from './options/global-pipes.config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: ['http://localhost:3001'],
    Credentials: true,
  });
  app.use(cookieParser());

  globalPipesConfig(app); // Enables global validation
  swaggerConfig(app);

  const PORT = Number(configService.get<number>('port'));
  await app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Api Documentation running on http://localhost:${PORT}/api`);
    console.log(`Api Documentation JSON on http://localhost:${PORT}/api-json`);
  });
}
bootstrap().catch((error) => console.error(error));
