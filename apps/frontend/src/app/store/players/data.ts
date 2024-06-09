import { createSlice } from '@reduxjs/toolkit';

import { PlayersData } from '../../types/state';
import { NameSpace } from '../../const';

const initialState: PlayersData = {
  players: [],
  isLoading: false,
  player: null,
  isPlayerLoading: true,
};

export const playersData = createSlice({
  name: NameSpace.Players,
  initialState,
  reducers: {
    setPlayers: (state, action) => {
      state.players = action.payload;
    },
    setPlayer: (state, action) => {
      state.player = action.payload;
    },
    setIsPlayerLoading: (state, action) => {
      state.isPlayerLoading = action.payload;
    },
    updatePlayer: (state, action) => {
      const index = state.players.findIndex(
        (player) => player.id === action.payload.id
      );
      state.players[index] = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setPlayers,
  setPlayer,
  setIsPlayerLoading,
  updatePlayer,
  setLoading,
} = playersData.actions;
