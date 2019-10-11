import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {Logger, ValidationPipe} from '@nestjs/common';
import { ConfigService} from 'nestjs-config';
import * as helmet from 'helmet';
import {getSwaggerDocs} from './config/swagger';
import {seeder} from './config/seeder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  getSwaggerDocs(app);
  app.use(helmet());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(ConfigService.get('server.appPort'), '0.0.0.0');
  await seeder();
  Logger.log(ConfigService.get('server.appStartMessage'));
}
bootstrap();
