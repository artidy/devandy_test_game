import { Controller, Post, Body, Get, Param } from '@nestjs/common';

import { UrlPaths } from '@devandy-test-game/shared';
import { PlayerService } from './player.service';

@Controller(UrlPaths.Players)
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get('')
  async getPlayers() {
    const players = await this.playerService.getPlayers();
    if (players.length === 0) {
      return { message: 'Нет зарегистрированных игроков.' };
    }
    const playerList = players.map(player => player.name).join('\n');

    return { message: `Зарегистрированные игроки:\n${playerList}` };
  }

  @Get(':id')
  async getPlayer(@Param('id') telegramId: string) {
    const player = await this.playerService.getPlayer(telegramId);

    if (!player) {
      return { message: 'Вы не зарегистрированы.' };
    }

    return player;
  }

  @Post('fight')
  async fight(@Body() { chatId }: { chatId: string }) {
    const player = await this.playerService.getPlayer(chatId);
    if (!player) {
      return { message: 'Вы не зарегистрированы. Используйте команду /start <имя> для регистрации.' };
    }
    const players = await this.playerService.getPlayers(chatId);
    const buttons = players.map(p => ({ name: p.name, telegramId: p.telegramId }));

    if (buttons.length === 0) {
      return { message: 'Нет доступных противников.' };
    } else {
      return { message: 'Выберите противника:', buttons };
    }
  }

  @Post('hit')
  async hit(@Body() { chatId }: { chatId: string }) {
    // const battle = this.game.getBattle(chatId);
    // if (!battle || battle.isFinished) {
    //   return { message: 'Бой уже закончен' };
    // }
    // const result = battle.hit();
    // const opponent = battle.opponent.telegramId === chatId ? battle.player : battle.opponent;
    // const menu = battle.isFinished ? 'main' : 'battle';
    //
    // return { message: result, menu, opponentId: opponent.telegramId };
  }
}
