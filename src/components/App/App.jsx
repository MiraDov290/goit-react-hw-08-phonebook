import { useEffect, lazy } from "react";
import { useDispatch } from "react-redux";
import { Layout } from 'components/Layout/Layout';
import { PrivateRoute } from 'components/PrivateRoute';
import { RestrictedRoute } from 'components/RestrictedRoute';
import { refreshUser } from 'redux/auth/operations';
import { useAuth } from 'components/hooks/useAuth';

// import Home from 'components/pages/Home';
// import Register  from 'components/pages/Register';
// import Login from 'components/pages/Login';
// import Contacts from 'components/pages/Contacts';


import { Wrapper } from './App.styled';
import { Route, Routes } from "react-router-dom";


const Home = lazy(() => import('components/pages/Home'));
const Register = lazy(() => import('components/pages/Register'));
const Login = lazy(() => import('components/pages/Login'));
const Contacts = lazy(() => import('components/pages/Contacts'));

    
export const App = () => {
  const dispatch = useDispatch();//отримуємо функцію dispatch для відправки дії до Redus store
  const { isRefreshing } = useAuth;//отримуємо стан футентифікації користувача

  useEffect(() => {
    dispatch(refreshUser());//викликаємо функцію оновлення користувача при монтажі компонента або зміні dispatch
  }, [dispatch]);

  return isRefreshing ? (
    <p>Оновлення користувача...</p>
        ) : (
      <Wrapper>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/*Головна сторінка*/}
            <Route index element={<Home />} />
            {/*Сторінка реєстрації користувача*/}
            <Route path="/register"
              element={
              <RestrictedRoute redirectTo="/login" component={<Register />}/>
            }
            />
            {/*Сторінка входу користувача*/}
            <Route path="/login" element={
              <RestrictedRoute redirectTo="/contacts" component={<Login />}/>
            }
            />
            {/*Сторінка контактів доступна тільки для автрризації користувача*/}
            <Route path="/contacts" element={
              <PrivateRoute redirectTo="/login" component={<Contacts />} />
            }
            />
          </Route>
          {/*Маршрут за замовчуванням*/}
          <Route path="*" element={<Home />} />
        </Routes>
          </Wrapper>
    );
  }
