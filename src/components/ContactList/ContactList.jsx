import React from 'react';
import { List, Item, Button } from './ContactList.styled';

import { useSelector, useDispatch } from 'react-redux';
import { selectVisibleContacts } from 'redux/selectors';
import { deleteContacts } from '../../redux/operations';

// Компонент списка контактiв
const ContactList = () => {
  const contacts = useSelector(selectVisibleContacts);
  const dispatch = useDispatch();
  // const handleDelete = () => dispatch(removeContact());
  return (
    <List>
      {contacts.map(contact => (
        <Item key={contact.id}>
          {contact.name + ' : ' + contact.number}
          {
            // Кнопка видалення контакта
            <Button type="button" name="delete" onClick={() => dispatch(deleteContacts(contact.id))}>
              delete
            </Button>
          }
        </Item>
      ))}
    </List>
  );
};

export default ContactList;