import logo from '../images/header__logo.svg';
import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

function Header({ email, handleLogExit }) {
  return (
    <header className='header'>
      <img className='header__logo' src={logo} alt='логотип место' />
      <div className='header__route-content'>
        <Switch>
          <Route exact path='/'>
            <p className='header__email'>{email}</p>
            <Link
              to='/sign-in'
              className='header__link'
              onClick={handleLogExit}
            >
              Выйти
            </Link>
          </Route>
          <Route exact path='/sign-in'>
            <Link to='/sign-up' className='header__link'>
              Регистрация
            </Link>
          </Route>
          <Route exact path='/sign-up'>
            <Link to='/sign-in' className='header__link'>
              Войти
            </Link>
          </Route>
        </Switch>
      </div>
    </header>
  );
}

export default Header;
