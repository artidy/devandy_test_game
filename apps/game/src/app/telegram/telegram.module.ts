import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import TelegramBot, { InlineKeyboardButton } from 'node-telegram-bot-api';

import { GameClass } from '@devandy-test-game/shared';
import { telegramConfig } from '../../config/telegram.config';
import { PlayerService } from '../player/player.service';
import { PlayerModule } from '../player/player.module';

@Module({
  imports: [PlayerModule]
})
export class TelegramModule implements OnModuleInit {
  private bot: TelegramBot;
  private game: GameClass;
  private messageIds: Map<number, number> = new Map();

  constructor(
    @Inject (telegramConfig.KEY) private readonly config: ConfigType<typeof telegramConfig>,
    private readonly playerService: PlayerService,
    ) {
    this.game = new GameClass();
  }
  async onModuleInit() {
    this.bot = new TelegramBot(
      this.config.telegramBotApiToken,
      { polling: true }
    );

    this.bot.onText(/\/start/, async (msg) => {
      const chatData = msg.chat;
      const chatId = chatData.id;
      const playerName = `${chatData.first_name} ${chatData.last_name}`;

      const player = await this.playerService.createPlayer({
        telegramId: chatId,
        name: playerName,
        health: 100,
        level: 0,
        inventory: []
      });

      this.editOrSendMessage(chatId, `${player.name} добро пожаловать в игру. Жми сразится для начала боя.`,
        this.getMainMenu());
    });

    this.bot.onText(/\/players/, async (msg) => {
      const chatId = msg.chat.id;
      const players = await this.playerService.getPlayers();
      if (players.length === 0) {
        this.editOrSendMessage(chatId, 'Нет зарегистрированных игроков.');
        return;
      }
      const playerList = players.map(player => `${player.name}`).join('\n');
      this.editOrSendMessage(chatId, `Зарегистрированные игроки:\n${playerList}`);
    });

    this.bot.onText(/\/fight/, async (msg) => {
      const chatId = msg.chat.id;
      const player = await this.playerService.getPlayer(chatId);

      if (!player) {
        this.editOrSendMessage(chatId, 'Вы не зарегистрированы. Используйте команду /start <имя> для регистрации.');
        return;
      }

      const buttons: InlineKeyboardButton[][] = (await this.playerService.getPlayers(chatId))
        .map(p => [{ text: p.name, callback_data: `fight_${p.telegramId}` }]);

      if (buttons.length === 0) {
        this.editOrSendMessage(chatId, 'Нет доступных противников.');
      } else {
        this.editOrSendMessage(chatId, 'Выберите противника:', {
          reply_markup: {
            inline_keyboard: buttons
          }
        });
      }
    });

    this.bot.on('callback_query', async (query) => {
      const chatData = query.message?.chat;
      const chatId = chatData.id;
      if (!chatId) return;

      if (query.data === 'show_players') {
        const players = await this.playerService.getPlayers();

        if (players.length === 0) {
          this.editOrSendMessage(chatId, 'Нет зарегистрированных игроков.');

          return;
        }

        const playerList = players.map(player => `${player.name}`).join('\n');

        this.editOrSendMessage(chatId, `Зарегистрированные игроки:\n${playerList}`, this.getMainMenu());
      }

      if (query.data === 'fight') {
        const player = await this.playerService.getPlayer(chatId);

        if (!player) {
          this.editOrSendMessage(chatId, 'Вы не зарегистрированы. Используйте команду /register <имя> для регистрации.');
          return;
        }

        const buttons: InlineKeyboardButton[][] = (await this.playerService.getPlayers(player.telegramId))
          .map(p => [{ text: p.name, callback_data: `fight_${p.telegramId}` }]);

        if (buttons.length === 0) {
          this.editOrSendMessage(chatId, 'Нет доступных противников.', this.getMainMenu());
        } else {
          this.editOrSendMessage(chatId, 'Выберите противника:', {
            reply_markup: {
              inline_keyboard: buttons
            }
          });
        }
      }

      if (query.data?.startsWith('fight_')) {
        const opponentId = parseInt(query.data.split('_')[1]);
        const player = await this.playerService.getPlayer(chatId);
        const opponent = await this.playerService.getPlayer(opponentId);

        if (!player || !opponent) {
          this.editOrSendMessage(chatId, 'Произошла ошибка. Попробуйте снова.');
          return;
        }

        this.game.addBattle(player, opponent);

        const message = `Начался бой между ${player.name} и ${opponent.name}\n`;

        this.editOrSendMessage(chatId, message, this.getBattleMenu());
        if (opponent.telegramId !== 0) {
          this.editOrSendMessage(opponent.telegramId, message, this.getBattleMenu());
        }
      }

      if (query.data === 'hit') {
        const battle = this.game.getBattle(chatId);

        if (!battle || battle.isFinished) {
          this.editOrSendMessage(chatId, 'Бой уже закончен', this.getMainMenu());
          return;
        }

        const result = battle.hit();
        const opponent = battle.opponent.telegramId === chatId ? battle.player : battle.opponent;
        const menu = battle.isFinished ? this.getMainMenu() : this.getBattleMenu();

        this.editOrSendMessage(chatId, result, menu);
        if (opponent.id !== 0) {
          this.editOrSendMessage(opponent.telegramId, result, menu);
        }
      }
    });
  }

  private getMainMenu() {
    return {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Посмотреть игроков', callback_data: 'show_players' }],
          [{ text: 'Сразиться', callback_data: 'fight' }]
        ]
      }
    };
  }

  private getBattleMenu() {
    return {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Нанести удар', callback_data: 'hit' }]
        ]
      }
    };
  }

  private editOrSendMessage(chatId: number, text: string, options: any = {}) {
    const messageId = this.messageIds.get(chatId);
    if (messageId) {
      this.bot.editMessageText(text, {
        chat_id: chatId,
        message_id: messageId,
        ...options
      }).catch(err => {
        console.log('Error editing message:', err);
        this.bot.sendMessage(chatId, text, options).then(sentMessage => {
          this.messageIds.set(chatId, sentMessage.message_id); // Сохраняем идентификатор нового сообщения
        });
      });
    } else {
      this.bot.sendMessage(chatId, text, options).then(sentMessage => {
        this.messageIds.set(chatId, sentMessage.message_id); // Сохраняем идентификатор нового сообщения
      });
    }
  }
}
