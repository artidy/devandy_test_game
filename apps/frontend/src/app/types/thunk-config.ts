import { AxiosInstance } from 'axios';

import { AppDispatch, State } from './state';

export type AsyncThunkConfig = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};
