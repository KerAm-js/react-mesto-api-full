import React from "react";
import Popup from './Popup';
import success from '../images/VectorSuccess.svg';
import error from '../images/VectorError.svg';

const InfoTooltip = ({ title, status, isOpened, onClose, }) => {
  return (
    <Popup 
      isOpened={isOpened}
      onClose={onClose}
      type="tooltip"
    >
      <div className="modal__block modal__block_type_tooltip">
        <img className="modal__tooltip-image" src={status === 'success' ? success : error} />
        <h2 className="modal__title modal__title_type_tooltip">
          {title}
        </h2>
      </div>
    </Popup>
  )
}

export default InfoTooltip;