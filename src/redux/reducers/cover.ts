import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getCompany as getCompanyReq } from '../../services/airclough-api';

interface Fields {
  Facts: string;
  Logo: any;
  Name: string;
}

interface Company {
  fields: Fields;
}

interface Cover {
  company: Company;
  slug: string;
}

export const getCompany = createAsyncThunk<any, string, { state: any }>(
  'getCompany',
  async ( slug ) => {
    const response = await getCompanyReq( slug );

    return response.data;
  },
);

const initialState: Cover = {
  company: null,
  slug: null,
};

export const coverSlice = createSlice( {
  extraReducers: {
    'getCompany/fulfilled': ( state, { payload } ) => {
      const { company } = payload;

      state.company = company;
    },
    'getCompany/rejected': () => {
      console.log( 'getCompany.rejected' );
    },
  },
  initialState,
  name: 'cover',
  reducers: {
    setSlug: ( state, action: PayloadAction<Cover[ 'slug' ]> ) => {
      const { payload } = action;

      state.slug = payload;
    },
  },
} );

export const { setSlug } = coverSlice.actions;

export default coverSlice.reducer;
