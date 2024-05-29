import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TelegramModule } from './telegram/telegram.module';
import { validateEnvironments } from './env.validation';
import { telegramConfig } from '../config/telegram.config';
import { ENV_FILE_PATH } from './app.const';

@Module({
  imports: [
    ConfigModule.forRoot({
        cache: true,
        isGlobal: true,
        envFilePath: ENV_FILE_PATH,
        load: [telegramConfig],
        validate: validateEnvironments,
    }),
    TelegramModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
