import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import TelegramBot from 'node-telegram-bot-api';

import { PlayerModule } from '../player/player.module';
import { telegramConfig } from '../../config/telegram.config';
import { PlayerService } from '../player/player.service';

@Module({
  imports: [PlayerModule],
})
export class TelegramModule implements OnModuleInit {
  private bot: TelegramBot;

  constructor(
    @Inject (telegramConfig.KEY) private readonly config: ConfigType<typeof telegramConfig>,
    private readonly playerService: PlayerService,
  ) {}

  async onModuleInit() {
    this.bot = new TelegramBot(
      this.config.botApiToken,
      { polling: true }
    );

    this.bot.onText(/\/start/, async (msg) => {
      const chatData = msg.chat;
      const chatId = String(chatData.id);
      const playerName = `${chatData.first_name} ${chatData.last_name}`;

      const player = await this.playerService.createPlayer({
        telegramId: chatId,
        name: playerName,
        health: 100,
        level: 0,
        inventory: []
      });

      await this.bot.sendMessage(chatId, `${player.name} добро пожаловать. Для запуска игры нажми играть.`,
        this.getMainMenu());
    });
  }

  private getMainMenu() {
    return {
      reply_markup: {
        inline_keyboard: [
          [{
            text: 'Играть',
            web_app: { url: `${this.config.gameURL}` }
          }]
        ]
      }
    };
  }
}
