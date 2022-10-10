import React from 'react';
import edit from '../images/profile__edit-image.svg';
import add from '../images/profile__add-image.svg';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className='content'>
      <section className='profile'>
        <img
          className='profile__avatar'
          style={{
            backgroundImage: `url(${
              currentUser !== null ? currentUser.avatar : ''
            })`,
          }}
          src={currentUser !== null ? currentUser.avatar : ''}
        />
        <button
          className='profile__avatar-redaction'
          type='button'
          onClick={onEditAvatar}
        ></button>
        <div className='profile__info'>
          <div className='profile__info-main'>
            <h1 className='profile__name'>
              {currentUser !== null ? currentUser.name : ''}
            </h1>
            <button
              className='profile__edit'
              type='button'
              onClick={onEditProfile}
            >
              <img
                className='profile__edit-image'
                src={edit}
                alt='кнопка редактировать'
              />
            </button>
          </div>
          <p className='profile__user-about'>
            {currentUser !== null ? currentUser.about : ''}
          </p>
        </div>
        <button className='profile__add' type='button' onClick={onAddPlace}>
          <img className='profile__add-image' src={add} alt='кнопка добавить' />
        </button>
      </section>
      <section className='elements'>
        <ul className='cards'>
          {cards.map((card) => (
            <Card
              itemCard={card}
              link={card.link}
              name={card.name}
              likes={card.likes}
              key={card._id}
              cardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
