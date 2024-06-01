import { IsNumber, IsString, validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { EnvValidationMessage } from './app.const';

class EnvironmentsConfig {
  @IsString({
    message: EnvValidationMessage.TelegramBotApiTokenNotRequired
  })
  public TELEGRAM_BOT_API_TOKEN: string;

  @IsString({
    message: EnvValidationMessage.TelegramChanelIdNotRequired
  })
  public TELEGRAM_CHANNEL_ID: string;

  @IsString({
    message: EnvValidationMessage.TelegramChanelIdNotRequired
  })
  public POSTGRES_DB: string;

  @IsString({
    message: EnvValidationMessage.TelegramChanelIdNotRequired
  })
  public POSTGRES_HOST: string;

  @IsNumber({}, {
    message: EnvValidationMessage.TelegramChanelIdNotRequired
  })
  public POSTGRES_PORT: number;

  @IsString({
    message: EnvValidationMessage.TelegramChanelIdNotRequired
  })
  public POSTGRES_USER: string;

  @IsString({
    message: EnvValidationMessage.TelegramChanelIdNotRequired
  })
  public POSTGRES_PASSWORD: string;

  @IsString({
    message: EnvValidationMessage.TelegramChanelIdNotRequired
  })
  public REDIS_HOST: string;

  @IsNumber({}, {
    message: EnvValidationMessage.TelegramChanelIdNotRequired
  })
  public REDIS_PORT: number;
}

export function validateEnvironments(config: Record<string, unknown>) {
  const environmentsConfig = plainToInstance(
    EnvironmentsConfig,
    config,
    { enableImplicitConversion: true  },
  );

  const errors = validateSync(
    environmentsConfig, {
      skipMissingProperties: false
    }
  );

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return environmentsConfig;
}
