import { NestFactory } from '@nestjs/core';
import { ShorterModule } from './shorter.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(ShorterModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true
    }),
  );

  app.use(cookieParser());

  
  // * set cors
  const whitelist = ["http://146.190.128.82:3000/"];

  app.enableCors({
    origin: (origin, callback) => {
      const isWhitelisted = whitelist.includes(origin)
      console.log("origin:",origin, isWhitelisted);
      
      callback(null, isWhitelisted);
    },
    credentials: true,
  })
  
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: 3002,
    },
  });
  await app.startAllMicroservices();
  await app.listen(8002);
}
bootstrap();
