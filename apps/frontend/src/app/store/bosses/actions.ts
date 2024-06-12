import { isAxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { UrlPaths } from '@devandy-test-game/shared';
import { AsyncThunkConfig } from '../../types/thunk-config';
import { Message, NameSpace } from '../../const';
import { setBosses, setBossesLoading } from './data';
import { bossesAdapt } from '../../services/adapters/bosses.adapter';
import data from '../../mocks/bosses.json';

export const getBossesApi = createAsyncThunk<void, undefined, AsyncThunkConfig>(
  `${NameSpace.Bosses}/${UrlPaths.Bosses}`,
  async (_arg, { dispatch, extra: api}) => {
    try {
      dispatch(setBossesLoading(true));

      dispatch(setBosses(bossesAdapt(data)));
    } catch(e) {
      let message = Message.UnknownMessage;

      if (isAxiosError(e)) {
        message = e.response?.data.message;
      }

      toast.error(message);
    }

    dispatch(setBossesLoading(false));
  }
);
