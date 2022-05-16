import { AnyAction } from 'redux';

import {
  SET_AIR,
  SET_AIR_INDEX,
  SET_AIR_TRANSITION,
  SET_JORDAN,
  SET_JORDAN_TRANSITION,
} from '../actions/app';

interface AppState {
  air: string[];
  airIndex: number | null;
  airTransition: 'PAUSED' | 'ACTIVE' | 'COMPLETE';
  jordan: string[];
  jordanTransition: 'PAUSED' | 'ACTIVE' | 'COMPLETE';
}

const initialState: AppState = {
  air: 'AIR'.split( '' ),
  airIndex: null,
  airTransition: 'PAUSED',
  jordan: 'JORDAN'.split( '' ),
  jordanTransition: 'PAUSED',
};

const app = (
  state = initialState,
  { payload, type }: AnyAction,
): AppState => {
  switch ( type ) {
    case SET_AIR: {
      const { air } = payload;

      return {
        ...state,
        air,
      };
    }
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
    case SET_JORDAN: {
      const { jordan } = payload;

      return {
        ...state,
        jordan,
      };
    }
    case SET_JORDAN_TRANSITION: {
      const { jordanTransition } = payload;

      return {
        ...state,
        jordanTransition,
      };
    }
    default:
      return state;
  }
};

export default app;
