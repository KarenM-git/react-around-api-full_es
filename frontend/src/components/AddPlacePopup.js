import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit }) {
  const nameRef = React.useRef();
  const linkRef = React.useRef();
  function handleSubmit(e) {
    e.preventDefault();
    onAddPlaceSubmit({
      name: nameRef.current.value,
      link: linkRef.current.value,
    });
  }
  return (
    <PopupWithForm
      name='add_place'
      isOpen={isOpen}
      title='Nuevo Lugar'
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className='popup__input-container'>
        <input
          name='name'
          type='text'
          required
          id='place-input'
          placeholder='Título'
          minLength='2'
          maxLength='30'
          className='popup__input popup__input_type_place'
          ref={nameRef}
        />
        <span className='place-input-error popup__error'></span>
      </div>
      <div className='popup__input-container'>
        <input
          name='link'
          type='url'
          required
          id='url-input'
          placeholder='Enlace a la imagen'
          className='popup__input popup__input_type_image'
          ref={linkRef}
        />
        <span className='url-input-error popup__error'></span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
