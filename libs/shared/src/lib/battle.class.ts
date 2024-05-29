import { Battle } from './battle.interface';
import { Player } from './player.interface';

export class BattleClass implements Battle {
  id: string;
  isFinished: boolean;
  opponent: Player;
  opponentHealth: number;
  player: Player;
  playerHealth: number;

  constructor(player: Player, opponent: Player) {
    this.id = `${player.id}-${opponent.id}`;
    this.player = player;
    this.playerHealth = player.health;
    this.opponent = opponent;
    this.opponentHealth = opponent.health;
    this.isFinished = false;
  }

  hit(): string {
    const player1Attack = Math.floor(Math.random() * 20) + 1;
    const player2Attack = Math.floor(Math.random() * 20) + 1;
    const player1Name = this.player.name;
    const player2Name = this.opponent.name;

    this.playerHealth -= player2Attack;
    this.opponentHealth -= player1Attack;

    let result = `Сражение между ${player1Name} и ${player2Name}!\n`;
    result += `${player1Name} наносит ${player1Attack} урона.\n`;
    result += `${player2Name} наносит ${player2Attack} урона.\n`;
    result += `${player1Name} имеет ${this.playerHealth} здоровья.\n`;
    result += `${player2Name} имеет ${this.opponentHealth} здоровья.\n`;

    if (this.playerHealth <= 0 && this.opponentHealth <= 0) {
      result += 'Оба игрока погибли!';
      this.isFinished = true;
    } else if (this.playerHealth <= 0) {
      result += `${player2Name} победил!`;
      this.isFinished = true;
    } else if (this.opponentHealth <= 0) {
      result += `${player1Name} победил!`;
      this.isFinished = true;
    } else {
      result += 'Сражение продолжается!';
    }

    return result;
  }
}
