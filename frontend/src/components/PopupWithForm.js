import React from 'react';
import Popup from './Popup';

const PopupWithForm = ({
  children, 
  name, 
  title, 
  isOpened, 
  onClose, 
  onSubmit,
  submitBtnText, 
  isSubmitBtnDisabled,
  submitBtnSelectorType = 'form__button_type_save',
}) => {

  return (
    <Popup 
      isOpened={isOpened}
      onClose={onClose}
      type={name}
    >
      <div className='modal__block'>
        <h2 className="modal__title">
          {title}
        </h2>
        <form onSubmit={onSubmit} name={`form${name[0].toUpperCase()}${name.slice(1)}`} className={`form form_type_${name}`}>
          {children}
          <button 
            disabled={isSubmitBtnDisabled}
            type="submit" 
            aria-label="сохранить" 
            className={`button form__button form__button_type_${submitBtnSelectorType}${isSubmitBtnDisabled ? ' form__button_disabled' : null}`}
          >
            {submitBtnText}
          </button>
        </form>
      </div>
    </Popup>
  )
}

export default PopupWithForm;