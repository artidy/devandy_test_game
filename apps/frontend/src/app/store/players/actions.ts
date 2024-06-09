import { isAxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { Player as PlayerApi, PlayerUpdate, UrlPaths } from '@devandy-test-game/shared';
import { AsyncThunkConfig } from '../../types/thunk-config';
import { Message, NameSpace } from '../../const';
import { setIsPlayerLoading, setLoading, setPlayer, setPlayers, updatePlayer } from './data';
import { playerAdapt, playersAdapt } from '../../services/adapters/players.adapter';

export const getPlayersApi = createAsyncThunk<void, undefined, AsyncThunkConfig>(
  `${NameSpace.Players}/${UrlPaths.Players}`,
  async (_arg, { dispatch, extra: api}) => {
    try {
      dispatch(setLoading(true));

      const {data} = await api.get<PlayerApi[]>(`${UrlPaths.Players}`);

      dispatch(setPlayers(playersAdapt(data)));
    } catch(e) {
      let message = Message.UnknownMessage;

      if (isAxiosError(e)) {
        message = e.response?.data.message;
      }

      toast.error(message);
    }

    dispatch(setLoading(false));
  }
);

export const getPlayerApi = createAsyncThunk<void, string, AsyncThunkConfig>(
  `${NameSpace.Players}/${UrlPaths.Players}/:id`,
  async (id, { dispatch, extra: api}) => {
    try {
      dispatch(setIsPlayerLoading(true));

      const {data} = await api.get<PlayerApi>(`${UrlPaths.Players}/${id}`);

      dispatch(setPlayer(playerAdapt(data)));
    } catch(e) {
      let message = Message.UnknownMessage;

      if (isAxiosError(e)) {
        message = e.response?.data.message;
      }

      toast.error(message);
    } finally {
      dispatch(setIsPlayerLoading(false));
    }
  }
);

export const updatePlayerApi = createAsyncThunk<void, PlayerUpdate, AsyncThunkConfig>(
  `${NameSpace.Players}/${UrlPaths.Players}/:id`,
  async (clientData, { dispatch, extra: api }) => {
    try {
      const { data } = await api.patch<PlayerApi>(`${UrlPaths.Players}/${clientData.id}`, clientData);

      dispatch(updatePlayer(playerAdapt(data)));

      toast.success(Message.UpdateElement);
    } catch(e) {
      let message = Message.UnknownMessage;

      if (isAxiosError(e)) {
        message = e.response?.data.message;
      }

      toast.error(message);
    }
  }
);
