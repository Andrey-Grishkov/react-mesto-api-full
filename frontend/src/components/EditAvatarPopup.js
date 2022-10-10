import PopupWithForm from './PopupWithForm';
import React from 'react';

function EditAvatarPopup({ isOpen, onClose, onUpdateUser }) {
  const profileAvatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      avatar: profileAvatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      btnTitle='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className='popup__user-input popup__user-input_input_card-image'
        type='url'
        id='input-avatar-url'
        required
        placeholder='Ссылка на аватар'
        minLength='2'
        name='link'
        ref={profileAvatarRef}
      />
      <span className='popup__error' id='input-avatar-url-error'></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
