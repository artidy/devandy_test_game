import { Player } from './player.interface';
import { Battle } from './battle.interface';

export interface Game {
  battles: Map<string, Battle>;
  addBattle(player: Player, opponent: Player): Battle;
  getBattle(id: string): Battle | undefined;
}
