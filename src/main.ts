import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SERVER_ERRORS } from './common/constants/server.errors';
import { AllExceptionsFilter } from './common/exception-filters/http-exception.filter';
import { MongoExceptionFilter } from './common/exception-filters/mongo-exception.filter';
import { SWAGGER_CUSTOM_CSS } from './common/utils/swagger/swagger-dark';

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

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
      filter: true,
    },
    // customCssUrl:
    //   'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.18.0/swagger-ui.min.css',
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.18.0/swagger-ui.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.18.5/swagger-ui-standalone-preset.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.18.5/swagger-ui.css',
    ],
    customCss: SWAGGER_CUSTOM_CSS,
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.18.0/swagger-ui-bundle.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.18.0/swagger-ui-standalone-preset.js',
    ],
    customfavIcon: 'https://yourdomain.com/favicon.ico',
    customSiteTitle: 'Your Lib API Docs - Dark Mode',
  });

  const port = configService.get<number>('PORT');
  if (!port) throw SERVER_ERRORS.NOT_FOUND_PORT;

  await app.listen(port);
}
void bootstrap();
