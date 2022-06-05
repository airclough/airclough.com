import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';

import app, { resetState as resetAppState } from './reducers/app';
import cover from './reducers/cover';
import monumentPark from './reducers/monumentPark';
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
  middleware: ( getDefaultMiddleware ) => getDefaultMiddleware( { serializableCheck: false } )
    .prepend( listenerMiddleware.middleware ),
  reducer: {
    app,
    cover,
    monumentPark,
    spotify,
    wallet,
  },
} );

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
