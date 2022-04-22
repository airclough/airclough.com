import { AnyAction } from 'redux';

import {
  SET_AIR_INDEX,
  SET_AIR_TRANSITION,
  SET_NAMESAKE,
  SET_NAMESAKE_TRANSITION,
} from '../actions/app';

interface AppState {
  airIndex: number | null;
  airTransition: 'PAUSED' | 'ACTIVE' | 'COMPLETE';
  namesake: Array<string>;
  namesakeTransition: 'PAUSED' | 'ACTIVE' | 'COMPLETE';
}

const initialState: AppState = {
  airIndex: null,
  airTransition: 'PAUSED',
  namesake: 'JORDAN'.split( '' ),
  namesakeTransition: 'PAUSED',
};

const app = (
  state = initialState,
  { payload, type }: AnyAction,
): AppState => {
  switch ( type ) {
    case SET_AIR_INDEX: {
      const { airIndex } = payload;

      return {
        ...state,
        airIndex,
      };
    }
    case SET_AIR_TRANSITION: {
      const { airTransition } = payload;

      return {
        ...state,
        airTransition,
      };
    }
    case SET_NAMESAKE: {
      const { namesake } = payload;

      return {
        ...state,
        namesake,
      };
    }
    case SET_NAMESAKE_TRANSITION: {
      const { namesakeTransition } = payload;

      return {
        ...state,
        namesakeTransition,
      };
    }
    default:
      return state;
  }
};

export default app;
