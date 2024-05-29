import { Player } from './player.interface';
import { Battle } from './battle.interface';

export interface Game {
  players: Map<number, Player>;
  battles: Map<number, Battle>;
  registerPlayer(id: number, name: string): Player;
  getPlayer(id: number): Player | undefined;
  addBattle(player: Player, opponent: Player): Battle;
  getBattle(id: number): Battle | undefined;
}
