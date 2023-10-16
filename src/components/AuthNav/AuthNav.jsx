import { Wrapper, Link } from './Auth.styled';

export const AuthNav = () => {
  // Компонент AuthNav відповідає за навігаційну панель для неаутентифікованого користувача

  return (
    <Wrapper>
      <Link to="/register">Register</Link>{' '}
      {/* Посилання на сторінку реєстрації користувача */}
      <Link to="/login">Log In</Link>{' '}
      {/* Посилання на сторінку входу користувача */}
    </Wrapper>
  );
};