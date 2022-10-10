import React from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';

function Register({ onRegister }) {
  const [userEmail, setUserEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(userEmail, password);
  }

  return (
    <div className='autorization'>
      <h3 className='autorization__title'>Регистрация</h3>
      <form className='autorization__form' onSubmit={handleSubmit}>
        <input
          className='autorization__user-input'
          type='email'
          id='input-email'
          required
          placeholder='Email'
          minLength='2'
          maxLength='40'
          name='userEmail'
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <input
          className='autorization__user-input'
          type='password'
          id='input-password'
          required
          placeholder='Пароль'
          minLength='2'
          maxLength='40'
          name='userPassword'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit' className='autorization__button-submit'>
          Зарегистрироваться
        </button>
      </form>
      <Link to='/sign-in' className='autorization__login-link'>
        Уже зарегистрированы? Войти
      </Link>
    </div>
  );
}

export default withRouter(Register);