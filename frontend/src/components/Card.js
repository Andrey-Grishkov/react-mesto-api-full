import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({
  itemCard,
  link,
  name,
  likes,
  cardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = itemCard.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `card__delete ${
    isOwn ? '' : 'card__delete_hidden'
  }`;
  const isLiked = itemCard.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__like ${
    isLiked ? 'card__like_active' : ''
  }`;

  function handleClick() {
    cardClick(itemCard);
  }

  function handleLikeClick() {
    onCardLike(itemCard);
  }

  function handleDeleteClick() {
    onCardDelete(itemCard);
  }

  return (
    <div>
      <li className='card'>
        <button
          className={cardDeleteButtonClassName}
          type='button'
          onClick={handleDeleteClick}
        ></button>
        <img
          className='card__image'
          style={{ backgroundImage: `url(${link})` }}
          onClick={handleClick}
          alt={name}
          src={link}
        />
        <div className='card__info'>
          <h2 className='card__title'>{name}</h2>
          <div className='card__like-container'>
            <button
              className={cardLikeButtonClassName}
              type='button'
              onClick={handleLikeClick}
            ></button>
            <div className='card__like-counter'>{likes.length}</div>
          </div>
        </div>
      </li>
    </div>
  );
}

export default Card;
