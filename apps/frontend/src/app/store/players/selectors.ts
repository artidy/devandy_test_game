import { createSelector } from '@reduxjs/toolkit';

import { NameSpace } from '../../const';
import { PlayersData, State } from '../../types/state';

export const getPlayers = createSelector(
  (state: State) => state[NameSpace.Players],
  (state: PlayersData) => state.players
);

export const playersIsLoading = createSelector(
  (state: State) => state[NameSpace.Players],
  (state: PlayersData) => state.isLoading
);

export const getPlayer = createSelector(
  (state: State) => state[NameSpace.Players],
  (state: PlayersData) => state.player
);

export const getIsPlayerLoading = createSelector(
  (state: State) => state[NameSpace.Players],
  (state: PlayersData) => state.isPlayerLoading
);
