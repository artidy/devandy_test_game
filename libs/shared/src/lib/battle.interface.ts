import { Player } from './player.interface';

export interface Battle {
  id: string;
  player: Player;
  playerHealth: number;
  opponent: Player;
  opponentHealth: number;
  isFinished: boolean;

  hit(): string;
}
