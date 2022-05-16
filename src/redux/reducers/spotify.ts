import { AnyAction } from 'redux';

import {
  SET_ACCESS_TOKEN,
} from '../actions/spotify';

interface AppState {
  accessToken: string | null;
}

const initialState: AppState = {
  accessToken: null
};

const spotify = (
  state = initialState,
  { payload, type }: AnyAction,
): AppState => {
  switch ( type ) {
    case SET_ACCESS_TOKEN: {
      const { accessToken } = payload;

      return {
        ...state,
        accessToken,
      };
    }
    default:
      return state;
  }
};

export default spotify;
