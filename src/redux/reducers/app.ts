import { AnyAction } from 'redux';

import { SET_NAMESAKE } from '../actions/app';

interface AppState {
  namesake: Array<string>;
}

const initialState: AppState = {
  namesake: 'JORDAN'.split( '' ),
};

const app = (
  state = initialState,
  { payload, type }: AnyAction,
): AppState => {
  switch ( type ) {
    case SET_NAMESAKE: {
      const { namesake } = payload;

      return {
        ...state,
        namesake,
      };
    }
    default:
      return state;
  }
};

export default app;
