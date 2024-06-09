import { Player as PlayerApi } from '@devandy-test-game/shared';
import { Player } from '../../types/player';

function playerAdapt(element: PlayerApi): Player {
  return { ...element };
}

function playersAdapt(elements: PlayerApi[]): Player[] {
  return elements ? elements.map((element) => playerAdapt(element)) : [];
}

export {
  playerAdapt,
  playersAdapt,
}
