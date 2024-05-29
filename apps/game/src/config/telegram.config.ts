import { registerAs } from '@nestjs/config';

export const telegramConfig = registerAs('telegram', () => ({
  telegramBotApiToken: process.env.TELEGRAM_BOT_API_TOKEN,
  telegramChanelId: process.env.TELEGRAM_CHANNEL_ID,
}));
