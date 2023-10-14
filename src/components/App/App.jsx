import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { Loyout } from '../Loyout/Loyut';
import { PrivateRoute } from '../PrivateRoute';
import { RestrictedRoute } from '../RestrictedRoute/RestrictedRoute';
import { refreshUser } from 'redux/auth/operations';
import { useAuth } from '../../hooks/useAuth';

import { Wrapper } from './App.styled';
import { Route, Routes } from "react-router-dom";


const Home = lazy(() => import('page/Home'));
const Register = lazy(() => import('page/Register'));
const Login = lazy(() => import('page/Login'));
const Contacts = lazy(() => import('page/Contacts'));

    
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
            {/*Сторінка реєхстрації користувача*/}
            <Route path="/register"
              element={
              <RestrictedRoute redirectTo="/login" component={<Register/>}/>
            }
            />
            {/*Сторінка входу користувача*/}
            <Route path="/login" element={
              <RestrictedRoute redirectTo="/contacts" component={<Login/>}/>
            }
            />
            {/*Сторінка контактів доступна тільки для автрризації користувача*/}
            <Route path="/contacts" element={
              <PrivateRoute redirectTo="/login" component={<Contacts />} />
            }
            />
          </Route>
          {/*Маршрут за замовчуванням*/}
          <Route path="*" element={<Home/>} />
        </Routes>
          </Wrapper>
    );
  }
