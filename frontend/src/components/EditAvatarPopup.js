import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }
  return (
    <PopupWithForm
      name='profile-pic'
      isOpen={isOpen}
      title='Cambiar foto de pefil'
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type='url'
        required
        placeholder='Enlace a la nueva imagen de perfil'
        className='popup__input popup__input_type_profile-pic'
        id='avatar-input'
        ref={avatarRef}
      />
      <span className='avatar-input-error popup__error'></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
