import PopupWithForm from './PopupWithForm';
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState('');
  const [about, setAbout] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    if (currentUser !== null && isOpen) {
      setName(currentUser.name);
      setAbout(currentUser.about);
    }
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeAbout(e) {
    setAbout(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about,
    });
  }

  return (
    <PopupWithForm
      name='profile'
      title='Редактировать профиль'
      btnTitle='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className='popup__user-input popup__user-input_input_name'
        type='text'
        id='input-name'
        required
        placeholder='Введите имя'
        minLength='2'
        maxLength='40'
        name='userName'
        value={name}
        onChange={handleChangeName}
      />
      <span className='popup__error' id='input-name-error'></span>
      <input
        className='popup__user-input popup__user-input_input_user-about'
        type='text'
        id='input-text'
        required
        placeholder='Введите информацию о себе'
        minLength='2'
        maxLength='200'
        name='userAboutInformation'
        value={about}
        onChange={handleChangeAbout}
      />
      <span className='popup__error' id='input-text-error'></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;