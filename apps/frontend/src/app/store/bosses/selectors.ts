import { createSelector } from '@reduxjs/toolkit';

import { NameSpace } from '../../const';
import { BossesData, State } from '../../types/state';

export const getBosses = createSelector(
  (state: State) => state[NameSpace.Bosses],
  (state: BossesData) => state.bosses
);

export const isBossesLoading = createSelector(
  (state: State) => state[NameSpace.Bosses],
  (state: BossesData) => state.isBossesLoading
);

export const getBoss = createSelector(
  (state: State) => state[NameSpace.Bosses],
  (state: BossesData) => state.boss
);

export const isBossLoading = createSelector(
  (state: State) => state[NameSpace.Bosses],
  (state: BossesData) => state.isBossLoading
);
