import { combineReducers } from 'redux';

import app from './app';
import spotify from './spotify';

export const rootReducer = combineReducers( { app, spotify } );

export type RootState = ReturnType<typeof rootReducer>;
