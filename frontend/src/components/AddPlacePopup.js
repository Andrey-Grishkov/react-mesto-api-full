import PopupWithForm from './PopupWithForm';
import React from 'react';
import { useState, useEffect } from 'react';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name,
      link
    });
  }

  function handleChangeName (e) {
    setName(e.target.value);
  }

  function handleChangeLink (e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      name='add-card'
      title='Новое место'
      btnTitle='Создать'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className='popup__user-input popup__user-input_input_card-title'
        id='input-title'
        type='text'
        placeholder='Название'
        minLength='2'
        maxLength='30'
        name='placeName'
        required value={name ? name : ''}
        onChange={handleChangeName}
      />
      <span className='popup__error' id='input-title-error'></span>
      <input
        className='popup__user-input popup__user-input_input_card-image'
        type='url'
        id='input-url'
        placeholder='Ссылка на картинку'
        minLength='2'
        name='link'
        required value={link ? link : ''}
        onChange={handleChangeLink}
      />
      <span className='popup__error' id='input-url-error'></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
