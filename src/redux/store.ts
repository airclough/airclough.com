import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';

import app, { resetState as resetAppState } from './reducers/app';
import spotify, { resetState as resetSpotifyState } from './reducers/spotify';
import wallet, { resetState as resetWalletState } from './reducers/wallet';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening( {
  effect: async ( _, { dispatch } ) => {
    dispatch( resetAppState() );
    dispatch( resetSpotifyState() );
    dispatch( resetWalletState() );
  },
  type: 'resetState',
} );

export const store = configureStore( {
  middleware: ( getDefaultMiddleware ) => getDefaultMiddleware().prepend( listenerMiddleware.middleware ),
  reducer: {
    app,
    spotify,
    wallet,
  },
} );

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
