import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';

export const swaggerConfig = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .addCookieAuth()
    .setTitle('GymRat')
    .setDescription('The GymRat API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  const theme = new SwaggerTheme();
  const darkStyle = theme.getBuffer(SwaggerThemeNameEnum.ONE_DARK);

  SwaggerModule.setup('api', app, documentFactory, {
    customCss: darkStyle,
  });
};
