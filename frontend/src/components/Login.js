import { withRouter } from 'react-router-dom';
import React from 'react';

function Login({ onLogin }) {
  const [userEmail, setUserEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(userEmail, password);
  }

  return (
    <div className='autorization'>
      <h3 className='autorization__title'>Вход</h3>
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
          onChange={(e) => {
            setUserEmail(e.target.value);
          }}
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
          Войти
        </button>
      </form>
    </div>
  );
}

export default withRouter(Login);