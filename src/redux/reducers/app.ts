import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface App {
  air: string[];
  airIndex: number | null;
  airTransition: 'PAUSED' | 'ACTIVE' | 'COMPLETE';
  jordan: string[];
  jordanTransition: 'PAUSED' | 'ACTIVE' | 'COMPLETE';
  jumpmanTransition: 'PAUSED' | 'ACTIVE' | 'COMPLETE';
}

const initialState: App = {
  air: 'AIR'.split( '' ),
  airIndex: null,
  airTransition: 'PAUSED',
  jordan: 'JORDAN'.split( '' ),
  jordanTransition: 'PAUSED',
  jumpmanTransition: 'PAUSED',
};

export const appSlice = createSlice( {
  initialState,
  name: 'app',
  reducers: {
    resetState: ( state ) => {
      state.air = initialState.air;
      state.jordan = 'CLOUGH'.split( '' );
    },
    setAir: ( state, action: PayloadAction<App[ 'air' ]> ) => {
      const { payload } = action;

      state.air = payload;
    },
    setAirIndex: ( state, action: PayloadAction<App[ 'airIndex' ]> ) => {
      const { payload } = action;

      state.airIndex = payload;
    },
    setAirJordan: ( state, action: PayloadAction<any> ) => {
      const { payload } = action;
      const { air, jordan } = payload;

      state.air = air;
      state.jordan = jordan;
    },
    setAirTransition: ( state, action: PayloadAction<App[ 'airTransition' ]> ) => {
      const { payload } = action;

      state.airTransition = payload;
    },
    setJordan: ( state, action: PayloadAction<App[ 'jordan' ]> ) => {
      const { payload } = action;

      state.jordan = payload;
    },
    setJordanTransition: ( state, action: PayloadAction<App[ 'jordanTransition' ]> ) => {
      const { payload } = action;

      state.jordanTransition = payload;
    },
    setJumpmanTransition: ( state, action: PayloadAction<App[ 'jumpmanTransition' ]> ) => {
      const { payload } = action;

      state.jumpmanTransition = payload;
    },
  },
} );

export const {
  resetState,
  setAir,
  setAirIndex,
  setAirJordan,
  setAirTransition,
  setJordan,
  setJordanTransition,
  setJumpmanTransition,
} = appSlice.actions;

export default appSlice.reducer;
