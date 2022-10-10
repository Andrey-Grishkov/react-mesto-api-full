function ImagePopup(props) {
  return (
    <div>
      <div
        className={`popup popup_type_image ${
          props.isOpen && 'popup_is-opened'
        }`}
      >
        <div className='popup__image-content'>
          <button
            className='popup__close'
            type='button'
            onClick={props.onClose}
          ></button>
          <img className='popup__image' alt={props.name} src={props.link} />
          <h3 className='popup__image-title'>{props.name}</h3>
        </div>
      </div>
    </div>
  );
}

export default ImagePopup;
