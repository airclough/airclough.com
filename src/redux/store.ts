import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';

import app, { resetState as resetAppState } from './reducers/app';
import spotify, { resetState as resetSpotifyState } from './reducers/spotify';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening( {
  effect: async ( action, { dispatch } ) => {
    dispatch( resetAppState() );
    dispatch( resetSpotifyState() );
  },
  type: 'resetState',
} );

export const store = configureStore( {
  middleware: ( getDefaultMiddleware ) =>getDefaultMiddleware().prepend( listenerMiddleware.middleware ),
  reducer: {
    app,
    spotify,
  },
} );

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
