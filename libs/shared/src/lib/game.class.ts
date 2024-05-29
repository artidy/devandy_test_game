import { Game } from './game.interface';
import { Player } from './player.interface';
import { Battle } from './battle.interface';
import { BattleClass } from './battle.class';

export class GameClass implements Game {
  players: Map<number, Player> = new Map();
  battles: Map<number, Battle> = new Map();

  registerPlayer(id: number, name: string): Player {
    const player: Player = {
      id,
      name,
      health: 100
    };

    this.players.set(id, player);

    return player;
  }

  addBattle(player: Player, opponent: Player): Battle {
    const battle: Battle = new BattleClass(player, opponent);

    this.battles.set(player.id, battle);
    this.battles.set(opponent.id, battle);

    return battle;
  }

  getPlayer(id: number): Player | undefined {
    return this.players.get(id);
  }

  getBattle(id: number): Battle | undefined {
    return this.battles.get(id);
  }
}
