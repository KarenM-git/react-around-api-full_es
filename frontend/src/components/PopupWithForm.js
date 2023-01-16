function PopupWithForm (props) {
    return (
      <div
        className={`popup popup_${props.name} ${
          props.isOpen ? "popup_opened" : ""
        }`}
      >
        <div className={`popup__container popup__container_${props.name}`}>
          <h3 className={`popup__title popup__title_${props.name}`}>
            {props.title}
          </h3>
          <form
            className='popup__form'
            name={props.name}
            onSubmit={props.onSubmit}
          >
            {props.children}
            <button className={`submit-button submit-button_${props.name}`}>
              Guardar
            </button>
          </form>
        </div>
        <button className='close-button' onClick={props.onClose}></button>
      </div>
    );
}

export default PopupWithForm 