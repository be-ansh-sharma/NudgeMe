// store.js
import { configureStore } from '@reduxjs/toolkit';
import slugSlice from './slugSlice';

export const store = configureStore({
  reducer: {
    slug: slugSlice,
  },
});
