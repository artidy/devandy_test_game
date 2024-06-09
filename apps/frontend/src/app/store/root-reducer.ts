import { combineReducers } from '@reduxjs/toolkit';

import { NameSpace } from '../const';
import { playersData } from './players/data';
import { bossesData } from './bosses/data';

export const rootReducer = combineReducers({
  [NameSpace.Players]: playersData.reducer,
  [NameSpace.Bosses]: bossesData.reducer,
});
