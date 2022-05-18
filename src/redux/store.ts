import { configureStore } from '@reduxjs/toolkit';

import app from './reducers/app';
import spotify from './reducers/spotify';

export const store = configureStore( {
  reducer: {
    app,
    spotify,
  },
} );

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
