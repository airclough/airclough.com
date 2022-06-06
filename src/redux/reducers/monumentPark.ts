import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getMonumentParkLeaderboard } from '../../services/airclough-api';

interface Entry {
  address: string;
  distance: number;
}

interface MonumentPark {
  leaderboard: Entry[];
}

export const getLeaderboard = createAsyncThunk<any, void, { state: any }>(
  'getLeaderboard',
  async () => {
    const response = await getMonumentParkLeaderboard();

    return response.data;
  },
);

const initialState: MonumentPark = {
  leaderboard: [],
};

export const monumentParkSlice = createSlice( {
  extraReducers: {
    'getLeaderboard/fulfilled': ( state, { payload } ) => {
      const { leaderboard } = payload;

      state.leaderboard = leaderboard;
    },
    'getLeaderboard/rejected': () => {
      console.log( 'getLeaderboard.rejected' );
    },
  },
  initialState,
  name: 'leaderboard',
  reducers: {},
} );

export default monumentParkSlice.reducer;
