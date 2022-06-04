import React from 'react';

const Popup = ({
  isOpened, 
  onClose, 
  children, 
  type
}) => {

  const onLayoutClickHanlder = (evt) => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  }

  return (
    <div className={`modal modal_type_${type} ${isOpened ? 'modal_opened' : ''}`} onClick={onLayoutClickHanlder}>
      <div className="modal__container">
        {children}
        <button type="button" aria-label="закрыть" className="button modal__close-button" onClick={onClose}></button>
      </div>
    </div>
  )
}

export default Popup;