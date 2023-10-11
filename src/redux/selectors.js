import { createSelector } from "@reduxjs/toolkit";

export const selectIsLoading = state => state.contacts.isLoading; // Повернення списку контактів із стану

export const selectError = state => state.contacts.error;

export const selectContacts = state => state.contacts.items;

export const selectFilter = state => state.filter; // Повертає  фільтр із стану

export const selectVisibleContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);
  // const contacts = getContacts(state); // Отримуємо список контактів
  // const filter = getFilter(state); // Отримуємо фильтр
  // const normalizedFilter = filter.toLowerCase(); // Перетворюємо фильтр в нижній регістр

  // Фільтрує контакти, для того щоб ім'я фільтра містило в нижнім регістрі)
  // return contacts.filter(contact =>
  //   contact.name.toLowerCase().includes(normalizedFilter)
  // );