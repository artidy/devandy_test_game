import { Player } from './player.interface';
import { Battle } from './battle.interface';

export interface Game {
  battles: Map<number, Battle>;
  addBattle(player: Player, opponent: Player): Battle;
  getBattle(id: number): Battle | undefined;
}
