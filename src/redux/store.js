import { configureStore } from '@reduxjs/toolkit';
import {
  // persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { contactsReducer } from './contactsSlice';
import { filterReducer } from './filterSlice';

// Створення сховища Redux за допомогою configureStore
export const store = configureStore({
  reducer: {
    contacts: contactsReducer, // Редюсер для управління станом контактів
    filter: filterReducer, // Редюсер для управління станом фільтра
  },

  // Застосування middleware за допомогою getDefaultMiddleware
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Створення сховища, яке зберігає значення стану сховища Redux при перевантаження сторінки
// export const persistor = persistStore(store);