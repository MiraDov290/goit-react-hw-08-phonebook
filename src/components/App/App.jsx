import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectContacts } from 'redux/selectors';
import { fetchContacts } from '../../redux/operations';

import { Container, Title, SubTitle, Wrapper } from './App.styled';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';

    
const App = () => {
  //використання селектора selectContacts для отримання списку контактів з Redux-сховища
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    //запуск асинхронної Thunk-дії fetchContacts при монтуванні компонента
    dispatch(fetchContacts());
  }, [dispatch]);

    return (
      <Container>
        <Title>Phonebook</Title>
        <ContactForm/>
        <SubTitle>Contacts</SubTitle>
        {contacts.length > 0 ? (
          // якщо є контакти показує компонент фільтрації
          <Filter/>
        ) : (
            //якщо немає контаків виводить повідомлення про вілдсутність контактів
          <Wrapper>Your phonebook is empty. Add first contact!</Wrapper>
        )}
        {contacts.length > 0 && (
          // якщо є контакти показує компонент списку контактів
          <ContactList/>
        )}
      </Container>
    );
  }

export default App;
