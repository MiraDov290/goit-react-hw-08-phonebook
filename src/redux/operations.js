import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//встановлення базового url для axios
axios.defaults.baseURL = 'https://651e899044a3a8aa47688bd4.mockapi.io';

//створення асинхронної Thunk-дії fetchContacts
export const fetchContacts = createAsyncThunk(
    'contacts/fetchAll',
    async (_, thunkAPI) => {
        try {
            //надсилання get-запиту на contacts
            const response = await axios.get('/contacts');
            //повепнення отримання даних
            return response.data;
        } catch (error) {
            //у разі помилки відхилення дії із зазначенням помилки
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

//створення асинхронної Thunk-дії addContacts
export const addContacts = createAsyncThunk(
    'contacts/addContacts',//унікальний код що ідентифікує цю дію
    async ({ name, number }, thunkAPI) => {
        try {
            //надсилання POST-запиту на '/contacts' з даними { name, number }
            const response = await axios.post('/contacts', { name, number });
            //повернення ортмання даних
            return response.data;
        } catch (error) {
            //у разі помилки відхилення дії із зазначенням помилки
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

//створення асинхронної Thunk-дії deleteContacts
export const deleteContacts = createAsyncThunk(
    'contacts/deleteContacts',//унікальний код що ідентифікує цю дію
    async (contactId, thunkAPI) => {
        try {
            //надсилання DELETE-запиту на '/contacts/${contactId}'
            const response = await axios.delete(`/contacts/${contactId}`);
            //повернення отримання даних
            return response.data;
        } catch (error) {
            //у разі помилки відхилення дії із зазначенням помилки
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

