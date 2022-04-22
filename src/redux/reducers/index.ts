import { combineReducers } from 'redux';

import app from './app';

export const rootReducer = combineReducers( { app } );

export type RootState = ReturnType<typeof rootReducer>;
