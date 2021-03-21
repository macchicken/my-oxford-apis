/* istanbul ignore file */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const expressSanitizer = require('express-sanitizer');
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(expressSanitizer());
  app.enableCors();
  await app.listen(13000);
}
bootstrap();
