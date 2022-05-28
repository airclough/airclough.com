import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

type Status = 'CONNECTED' | 'NOT_CONNECTED' | 'CONNECTING' | 'NOT_INSTALLED';

interface Wallet {
  address: string;
  displayAddress: string;
  provider: any | null;
  status: Status;
}

export const getAccounts = createAsyncThunk<any, void, { state: Wallet }>(
  'getAccounts',
  async ( _, { getState } ) => {
    const { address } = getState();

    return address;
  },
);

const createDisplayAddress = ( address: string ) => {
  const { length } = address;
  const firstFour = address.slice( 0, 6 );
  const lastFour = address.slice( length - 4, length );
  const displayAddress = `${ firstFour }...${ lastFour }`;

  return displayAddress;
};

const initialState: Wallet = {
  address: '',
  displayAddress: '',
  provider: null,
  status: 'CONNECTING',
};

export const walletSlice = createSlice( {
  extraReducers: {
    'getAccounts/fulfilled': ( state, { payload } ) => {
      //
    },
    'getAccounts/rejected': () => {
      console.log( 'getAccounts.rejected' );
    },
  },
  initialState,
  name: 'wallet',
  reducers: {
    resetState: ( state ) => {
      state = { ...initialState };
    },
    setAddress: ( state, action: PayloadAction<Wallet[ 'address' ]> ) => {
      const { payload } = action;

      state.address = payload;
      state.displayAddress = createDisplayAddress( payload );
    },
    setProvider: ( state, action: PayloadAction<Wallet[ 'provider' ]> ) => {
      const { payload } = action;

      state.provider = payload;
    },
    setStatus: ( state, action: PayloadAction<Wallet[ 'status' ]> ) => {
      const { payload } = action;

      state.status = payload;
    },
  },
} );

export const {
  resetState,
  setAddress,
  setProvider,
  setStatus,
} = walletSlice.actions;

export default walletSlice.reducer;
