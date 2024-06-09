import { registerAs } from '@nestjs/config';

export const telegramConfig = registerAs('telegram', () => ({
  botApiToken: process.env.TELEGRAM_BOT_API_TOKEN,
  gameURL: process.env.GAME_URL,
}));
