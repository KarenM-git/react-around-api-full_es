import success from "../images/success.png";
import failed from "../images/failed.png";

function InfoTooltip({ isRegistered, onClose, isOpen }) {
  return (
      <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className='popup__container'>
        <img
          className='popup__image_info-tooltip'
          src={isRegistered ? success : failed}
          alt={isRegistered ? "succesful registry" : "failed registry"}
        />
        <p className='popup__text_info-tooltip'>
          {isRegistered
            ? "Succes! you have now been registered"
            : "Oops! something went wrong please try again"}
        </p>
      </div>
          <button className='close-button' onClick={onClose} />
    </div>
  );
}

export default InfoTooltip;
