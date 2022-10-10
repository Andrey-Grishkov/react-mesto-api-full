function PopupWithForm(props) {
  return (
    <div>
      <div
        className={`popup popup_type_${props.name} ${
          props.isOpen && 'popup_is-opened'
        }`}
      >
        <div className='popup__content'>
          <button
            className='popup__close'
            type='button'
            onClick={props.onClose}
          ></button>
          <h3 className='popup__title'>{props.title}</h3>
          <form
            className='popup__form'
            name={`${props.name}Form`}
            noValidate
            onSubmit={props.onSubmit}
          >
            {props.children}
            <button className='popup__button-submit' type='submit'>
              {props.btnTitle}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PopupWithForm;
