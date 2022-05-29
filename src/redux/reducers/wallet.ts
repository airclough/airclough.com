import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { utils } from 'ethers';

type Status = 'CONNECTED' | 'NOT_CONNECTED' | 'CONNECTING' | 'NOT_INSTALLED';

interface Wallet {
  address: string;
  contract: any | null;
  displayAddress: string;
  provider: any | null;
  status: Status;
}

export const enter = createAsyncThunk<any, void, { state: any }>(
  'enter',
  async ( _, { getState } ) => {
    const { wallet } = getState();
    const { contract } = wallet;
    const transaction = await contract.enter( { value: utils.parseEther( '0.01' ) } )
      .catch( ( error ) => console.error( { error } ) );

    return transaction;
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
  contract: null,
  displayAddress: '',
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
  setProvider,
  setStatus,
} = walletSlice.actions;

export default walletSlice.reducer;
