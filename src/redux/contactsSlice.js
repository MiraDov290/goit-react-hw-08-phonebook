import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchContacts, addContacts, deleteContacts } from './operations';


// Контакти телефона
// const phoneContacts = {
//   items: [
//    { id: 'id-1', name: 'Rosie Simpson', number: '369-10-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Rostyslav Dovhan', number: '337-81-15' },
//       { id: 'id-5', name: 'Myroslava Mazuryk', number: '332-91-11' },
//   ],
// };

//визначення масиву extraActions, що містить асинхронні Thunk-дії
// const extraActions = [fetchContacts, addContact, deleteContacts];

// const getActions = type => isAnyOf(...extraActions.map(action => action[type]))

//визначення функції getAction, яка повертає умову isAnuOf для зазначеного типу дії
const getActions = type =>
  isAnyOf(fetchContacts[type], addContacts[type], deleteContacts[type]);

//початковий стан для contactsSlice
const initialState = { items: [], isLoading: false, error: null };

// Створення slice контактів з використанням createSlice
const contactsSlice = createSlice({
  name: 'contacts', // Ім'я slice контактів
  initialState, // Початкове становище контактів
  extraReducers: builder =>
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;//оновлення списку контактів у стані
      })
  .addCase(addContacts.fulfilled, (state, action) => {
        state.items.unshift(action.payload);//додавання нового контакту на посатку списка
  })
  .addCase(deleteContacts.fulfilled, (state, action) => {
    const index = state.items.findIndex(
      contact => contact.id === action.payload.id
    );
    state.items.splice(index, 1);//видалення контакту зі списку корнтактів
  })
  
      .addMatcher(getActions('pending'), state => {
        state.isLoading = true;//установка прапора isLoading = true
      })
  .addMatcher(getActions('rejected'), (state, action) => {
    state.isLoading = false;//скидання прапора isLoading = false
    state.error = action.payload;//вставлення повідомлення про помилку
  })
  .addMatcher(getActions('fulfilled'), state => {
    state.isLoading = false;//скидання прапора isLoading = false
    state.error = null;//скидання повідомлення про помилку
      })
})
//   reducers: {
//     addContact: {
//       reducer(state, action) {
//         state.items.push(action.payload); // Добавити нового контакта в список контактів
//       },
//     },
//     prepare(newContact) {
//       return {
//         payload: { id: nanoid(), ...newContact }, // Підготовка даних для добавлення контакта с уникальним ідентифікатором
//       };
//     },
//     removeContact(state, action) {
//       const index = state.items.findIndex(
//         contact => contact.id !== action.payload
//       );
//       state.items.splice(index, 1); // Видалення контакта зі списку контактів
//     },
//   },
// });

// Експорт дії addContact та removeContact з slice контактів
export const { addContact, deleteContact } = contactsSlice.actions;

// Створення persistReducer для збереження стану контактів с виктристанням redux-persist
export const contactsReducer = contactsSlice.reducer;