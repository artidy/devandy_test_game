import { createSlice } from '@reduxjs/toolkit';

import { BossesData } from '../../types/state';
import { NameSpace } from '../../const';

const initialState: BossesData = {
  bosses: [],
  isBossesLoading: true,
  boss: null,
  isBossLoading: true,
};

export const bossesData = createSlice({
  name: NameSpace.Bosses,
  initialState,
  reducers: {
    setBosses: (state, action) => {
      state.bosses = action.payload;
    },
    setBoss: (state, action) => {
      state.boss = action.payload;
    },
    setIsBossLoading: (state, action) => {
      state.isBossLoading = action.payload;
    },
    updateBoss: (state, action) => {
      const index = state.bosses.findIndex(
        (boss) => boss.id === action.payload.id
      );
      state.bosses[index] = action.payload;
    },
    setBossesLoading: (state, action) => {
      state.isBossesLoading = action.payload;
    },
  },
});

export const {
  setBosses,
  setBoss,
  setIsBossLoading,
  updateBoss,
  setBossesLoading,
} = bossesData.actions;
