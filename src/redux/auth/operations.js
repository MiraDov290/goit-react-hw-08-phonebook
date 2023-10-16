import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';

axios.defaults.baseURL = 'https://phonebook-db-2lk4.onrender.com/';

const setAuthHeader = token => {
  // Встановлення заголовка авторизації у вихідних параметрах запиту
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  // Очищення заголовка авторизації
  axios.defaults.headers.common.Authorization = '';
};

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      // Виконання POST-запиту на реєстрацію користувача
      const res = await axios.post('/users/register', credentials); //signup
      console.log(res.data);
      setAuthHeader(res.data.token); // Встановлення отриманого токена авторизації у заголовок
      return res.data; // Повернення даних з відповіді сервера
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Обробка помилки із викликом rejectWithValue
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      // Виконання POST-запиту на авторизацію користувача
      const res = await axios.post('/users/login', credentials);
      setAuthHeader(res.data.token); // Встановлення отриманого токена авторизації у заголовок
      return res.data; // Повернення даних з відповіді сервера
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Обробка помилки із викликом rejectWithValue
    }
  }
);

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    // Виконання POST-запиту на виход користувача
    await axios.post('/users/logout');
    clearAuthHeader(); // Очищення заголовка авторизації
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message); // Обробка помилки із викликом rejectWithValue
  }
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user'); // Помилка, якщо токен не збережений у стані
    }

    try {
      setAuthHeader(persistedToken); // Встановлення збереженого токена авторизації у заголовок
      const res = await axios.get('/users/current'); // Виконання GET-запиту для отримання інформації про користувача
      return res.data; // Повернення даних з відповіді сервера
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Обробка помилки із викликом rejectWithValue
    }
  }
);

//встановлення базового url для axios
// axios.defaults.baseURL = 'https://651e899044a3a8aa47688bd4.mockapi.io';

//створення асинхронної Thunk-дії fetchContacts
// export const fetchContacts = createAsyncThunk(
//     'contacts/fetchAll',
//     async (_, thunkAPI) => {
//         try {
            //надсилання get-запиту на contacts
            // const response = await axios.get('/contacts');
            //повепнення отримання даних
        //     return response.data;
        // } catch (error) {
            //у разі помилки відхилення дії із зазначенням помилки
//             return thunkAPI.rejectWithValue(error.message);
//         }
//     }
// );

//створення асинхронної Thunk-дії addContacts
// export const addContacts = createAsyncThunk(
//     'contacts/addContacts',//унікальний код що ідентифікує цю дію
    // async ({ name, number }, thunkAPI) => {
    //     try {
            //надсилання POST-запиту на '/contacts' з даними { name, number }
            // const response = await axios.post('/contacts', { name, number });
            //повернення ортмання даних
        //     return response.data;
        // } catch (error) {
            //у разі помилки відхилення дії із зазначенням помилки
//             return thunkAPI.rejectWithValue(error.message);
//         }
//     }
// );

//створення асинхронної Thunk-дії deleteContacts
// export const deleteContacts = createAsyncThunk(
//     'contacts/deleteContacts',//унікальний код що ідентифікує цю дію
    // async (contactId, thunkAPI) => {
    //     try {
            //надсилання DELETE-запиту на '/contacts/${contactId}'
            // const response = await axios.delete(`/contacts/${contactId}`);
            //повернення отримання даних
        //     return response.data;
        // } catch (error) {
            //у разі помилки відхилення дії із зазначенням помилки
//             return thunkAPI.rejectWithValue(error.message);
//         }
//     }
// );

