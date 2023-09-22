import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { AuthsModule } from './auths.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AuthsModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true
    }),
  );

  app.use(cookieParser());
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: 3001,
    },
  });
  await app.startAllMicroservices();

  // * set cors
  const whitelist = ["http://aunshorter.vercel.app", "http://localhost:3000"];

  app.enableCors({
    origin: (origin, callback) => {
      const isWhitelisted = whitelist.includes(origin)
      callback(null, isWhitelisted);
    },
    credentials: true,
  })


  await app.listen(8001);
}
bootstrap();
