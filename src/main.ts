import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import logger from './shared/logger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './shared/filters/exception.filter';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://localhost:3001',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    },
    logger,
  });
  const configService = app.get(ConfigService);
  app.useGlobalFilters(new HttpExceptionFilter(new Logger()));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Villakade')
    .setDescription('This is the documentation for the Back-End API')
    .setVersion('0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  const customOptions: SwaggerCustomOptions = {
    customSiteTitle: 'Villakade Back-End API',
  };

  SwaggerModule.setup('docs', app, document, customOptions);

  await app.listen(configService.get<number>('port'));
}
bootstrap();
