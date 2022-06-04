import React from "react";
import PopupWithForm from "./PopupWithForm";


const ConfirmPopup = ({onClose, isOpened, onConfirm}) => {

  const hanldeSubmit = evt => {
    evt.preventDefault();
    onConfirm();
  } 

  return (
    <PopupWithForm
      onSubmit={hanldeSubmit}
      name='confirm'
      title='Вы уверены?'
      isOpened={isOpened}
      onClose={onClose}
      submitBtnText='Да'
      submitBtnSelectorType='confirm'
    />
  )
}

export default ConfirmPopup;