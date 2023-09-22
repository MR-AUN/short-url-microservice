import { Module } from '@nestjs/common';
import { ShorterService } from './shorter.service';
import { ShorterController } from './shorter.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Shorter, ShorterSchema } from './schema/shorter.schema';
import { ShorterRepository } from './shorter.repository';
import { JwtGuard } from './common/guards';
import { APP_GUARD} from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategy';
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule], 
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'), 
      }),
      inject: [ConfigService], 
    }),
  MongooseModule.forFeature([{ name: Shorter.name, schema: ShorterSchema }]),
  ConfigModule.forRoot({
    isGlobal: true
  }),
],
  controllers: [ShorterController],
  providers: [
    ShorterService,
    JwtStrategy,
    ShorterRepository,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
  exports: [ShorterRepository]
})
export class ShorterModule { }
