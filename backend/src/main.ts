import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(bodyParser.json({ limit: '10mb' })); // JSON payload tối đa 10MB
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
  app.use('/public', express.static(join(__dirname, '..', 'public')));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
