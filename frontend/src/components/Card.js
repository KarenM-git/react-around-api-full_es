import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `cards__delete-button ${
    isOwn ? " " : "cards__delete-button_hidden"
  }`;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `like-button ${
    isLiked ? "like-button_active" : ""
  }`;

  function handleClick() {
    onCardClick(card);
  };

  function handleLikeClick() {
    onCardLike(card);
  };

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className='cards__element'>
      <img
        src={card.link}
        className='cards__image'
        alt={card.name}
        onClick={handleClick}
      />
      <div className='cards__footer'>
        <p className='cards__caption'>{card.name}</p>
        <div className='like-container'>
          <button className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <p className='like-count'>{card.likes.length}</p>
        </div>
      </div>
      <button className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
    </div>
  );
}

export default Card;
