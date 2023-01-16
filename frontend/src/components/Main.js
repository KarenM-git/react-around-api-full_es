import React from "react";
import Card from "./Card.js";

import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main({
  onEditProfileClick,
  onEditAvatarClick,
  onAddPlaceClick,
  cards,
  onCardDelete,
  onCardLike,
  onCardClick,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className='main'>
      <section className='profile'>
        <div className='profile__container'>
          <div className='profile__avatar-container'>
            <img
              src={currentUser.avatar}
              className='profile__avatar'
              alt='imagen de perfil'
            />
            <div
              onClick={onEditAvatarClick}
              className='profile__avatar-overlay'
            >
              <span className='edit-icon'> </span>
            </div>
          </div>
          <div className='profile__info'>
            <div className='profile__name-container'>
              <p className='profile__name'> {currentUser.name} </p>
              <p className='profile__description'> {currentUser.about}</p>
            </div>
            <button
              onClick={onEditProfileClick}
              className='edit-button'
            ></button>
          </div>
        </div>
        <button onClick={onAddPlaceClick} className='add-button'></button>
      </section>

      <div className='popup popup_delete-card'>
        <div className='popup__container popup__container_delete-card'>
          <h3 className='popup__title popup__title_delete-card'>
            ¿Estás seguro?
          </h3>
          <form className='popup__form'>
            <button className='submit-button'>Sí</button>
          </form>
        </div>
        <button className='close-button'></button>
      </div>

      <section className='cards'>
        {cards.map((card) => (
          <Card
            card={card}
            onCardClick={onCardClick}
            key={card._id}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
