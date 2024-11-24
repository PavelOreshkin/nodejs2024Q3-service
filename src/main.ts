import { NestFactory } from '@nestjs/core';
import * as process from 'node:process';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { initDatabase } from './db/data-source';
import { catchUncaughtErrors } from './utils/catchUncaughtErrors';
import { runSwaggerDoc } from './utils/swaggerDoc';
import { initLogger } from './logger/initLogger';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const logger = initLogger(app);
  catchUncaughtErrors(logger);
  runSwaggerDoc(app);
  await initDatabase();

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
