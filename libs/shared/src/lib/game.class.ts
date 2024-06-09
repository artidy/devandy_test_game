import { Game } from './game.interface';
import { Player } from './player.interface';
import { Battle } from './battle.interface';
import { BattleClass } from './battle.class';

export class GameClass implements Game {
  battles: Map<string, Battle> = new Map();

  addBattle(player: Player, opponent: Player): Battle {
    const battle: Battle = new BattleClass(player, opponent);

    this.battles.set(player.telegramId, battle);
    this.battles.set(opponent.telegramId, battle);

    return battle;
  }

  getBattle(id: string): Battle | undefined {
    return this.battles.get(id);
  }
}
