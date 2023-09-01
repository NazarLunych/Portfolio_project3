import {configureStore} from '@reduxjs/toolkit';
import inputs from './inputs';

export const store = configureStore({
  reducer: {
    inputs,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
