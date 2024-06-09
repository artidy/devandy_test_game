import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TelegramModule } from './telegram/telegram.module';
import { RedisModule } from './redis/redis.module';
import { validateEnvironments } from './env.validation';
import { telegramConfig } from '../config/telegram.config';
import { redisConfig } from '../config/redis.config';
import { ENV_FILE_PATH } from './app.const';
import { getTypeOrmConfig, postgresConfig } from '../config/postgres.config';
import { PlayerModule } from './player/player.module';

@Module({
  imports: [
    ConfigModule.forRoot({
        cache: true,
        isGlobal: true,
        envFilePath: ENV_FILE_PATH,
        load: [telegramConfig, redisConfig, postgresConfig],
        validate: validateEnvironments,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmConfig,
    }),
    RedisModule,
    PlayerModule,
    TelegramModule,
  ],
})
export class AppModule {}
