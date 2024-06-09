import { store } from '../store';
import { Player } from './player';
import { Boss } from './boss';

export type PlayersData = {
  players: Player[];
  isLoading: boolean;
  player: Player | null,
  isPlayerLoading: boolean,
};

export type BossesData = {
  bosses: Boss[];
  isBossesLoading: boolean;
  boss: Boss | null,
  isBossLoading: boolean,
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
