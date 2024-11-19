import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule } from '@nestjs/swagger';
import * as YAML from 'yamljs';
import { join } from 'path';
import { AppDataSource } from './data-source';

import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const document = YAML.load(join(process.cwd(), '/doc/api.yaml'));
  SwaggerModule.setup('doc', app, document);

  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
