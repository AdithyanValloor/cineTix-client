import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Uses localStorage

const persistConfig = {
  key: 'user',
  storage, // Store in localStorage
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer, 
  },
});

export const persistor = persistStore(store);
