import { NestFactory } from '@nestjs/core';
import 'dotenv/config';

import { AppModule } from './app.module';

import { setupSwagger } from './config/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('server');

  setupSwagger(app);

  const PORT = configService.get('APP_PORT') || 3000;
  await app.listen(PORT, '0.0.0.0');
}
bootstrap();
