import { IsString, validateSync } from 'class-validator';
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
