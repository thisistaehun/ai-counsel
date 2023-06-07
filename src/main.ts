import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvConfig } from './modules/common/types/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = new ConfigService<EnvConfig>();
  const port = configService.getOrThrow('SERVER_PORT');
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
  console.log(`Application is running on: ${port} 🚀`);
}
bootstrap();
