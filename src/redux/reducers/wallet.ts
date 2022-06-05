import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { utils } from 'ethers';

import { createDisplayAddress } from '../../utils/wallet';

type Status = 'CONNECTED' | 'NOT_CONNECTED' | 'CONNECTING' | 'NOT_INSTALLED';

interface Wallet {
  address: string;
  contract: any | null;
  displayAddress: string;
  network: string;
  provider: any | null;
  status: Status;
}

export const enter = createAsyncThunk<any, number[], { state: any }>(
  'enter',
  async ( [ x, y ], { getState } ) => {
    const { wallet } = getState();
    const { contract } = wallet;
    const transaction = await contract.contract.enter( x, y, { value: utils.parseEther( '0.01' ) } )
      .catch( ( error ) => console.error( { error } ) );
    const transactionReceipt = await transaction.wait();

    return transactionReceipt;
  },
);

const initialState: Wallet = {
  address: '',
  contract: null,
  displayAddress: '',
  network: '',
  provider: null,
  status: 'CONNECTING',
};

export const walletSlice = createSlice( {
  extraReducers: {
    'enter/fulfilled': ( state, { payload } ) => {
      console.log( { payload } );
    },
    'enter/rejected': () => {
      console.log( 'enter.rejected' );
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
    setContract: ( state, action: PayloadAction<Wallet[ 'contract' ]> ) => {
      const { payload } = action;

      state.contract = payload;
    },
    setNetwork: ( state, action: PayloadAction<Wallet[ 'network' ]> ) => {
      const { payload } = action;

      state.network = payload;
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
  setContract,
  setNetwork,
  setProvider,
  setStatus,
} = walletSlice.actions;

export default walletSlice.reducer;
