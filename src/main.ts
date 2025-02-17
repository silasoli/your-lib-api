import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SERVER_ERRORS } from './common/constants/server.errors';
import { AllExceptionsFilter } from './common/exception-filters/http-exception.filter';
import { MongoExceptionFilter } from './common/exception-filters/mongo-exception.filter';
// import { SWAGGER_CUSTOM_CSS } from './common/utils/swagger/swagger-dark';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  app.useGlobalFilters(new AllExceptionsFilter(), new MongoExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Your Lib API')
    .setDescription('Your Lib API developed by @silasoli')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const theme = new SwaggerTheme();

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
      filter: true,
    },
    customSiteTitle: 'Your Lib API Docs',
    customfavIcon:
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.18.0/favicon-32x32.png',
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.18.0/swagger-ui.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.18.5/swagger-ui-standalone-preset.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.18.5/swagger-ui.css',
    ],
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.18.0/swagger-ui-bundle.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.18.0/swagger-ui-standalone-preset.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.18.0/swagger-ui-init.js',
    ],
    customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK),
    // customCss: SWAGGER_CUSTOM_CSS,
  });

  const port = configService.get<number>('PORT');
  if (!port) throw SERVER_ERRORS.NOT_FOUND_PORT;

  await app.listen(port);
}
void bootstrap();
