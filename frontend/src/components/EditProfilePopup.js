import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Pasa los valores de los componentes gestionados al controlador externo
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title='Editar Perfil'
      name='edit_profile'
      onSubmit={handleSubmit}
    >
      <div className='popup__input-container'>
        <input
          name='username'
          type='text'
          placeholder='Nombre'
          id='name-input'
          minLength='2'
          maxLength='40'
          required
          className='popup__input popup__input_type_name'
          value={name || " "}
          onChange={handleNameChange}
        />
        <span className='name-input-error popup__error'> </span>
      </div>
      <div className='popup__input-container'>
        <input
          name='ocupation'
          type='text'
          placeholder='Sobre mí'
          id='about-me'
          minLength='2'
          maxLength='200'
          required
          className='popup__input popup__input_type_about-me'
          value={description || " "}
          onChange={handleDescriptionChange}
        />
        <span className='about-me-error popup__error'> </span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
