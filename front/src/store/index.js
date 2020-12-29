import { configureStore } from '@reduxjs/toolkit';
import rootSlice from './reducers';

const store = configureStore({
  reducer: rootSlice
});

export default store;
