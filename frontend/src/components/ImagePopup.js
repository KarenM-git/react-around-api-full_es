function ImagePopup (props) {
    return(
        <div className={`popup img-popup ${props.card ? 'popup_opened' :''}`}>
            <div className="img-popup__container">
              <img src={props.card.link} className="img-popup__image" alt={props.card.name} />
              <p className="img-popup__caption">{props.card.name}</p>
            </div>
            <button className="close-button img-popup__close" onClick={props.onClose}></button>
          </div>
    )
}

export default ImagePopup;