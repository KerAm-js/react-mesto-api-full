import React from "react";
import Popup from "./Popup";

const ImagePopup = ({selectedCard, onClose}) => {
  
  return (
    <Popup isOpened={!!selectedCard} onClose={onClose} type="image">
      <img src={selectedCard?.link} alt="картинка" className="modal__image"/>
      <p className="modal__place-name">{selectedCard?.name}</p>
    </Popup>
  )
}

export default ImagePopup;