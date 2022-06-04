import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({isOpened, onClose, onAddPlace}) => {

  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  const onNameChange = evt => setName(evt.target.value);
  const onLinkChange = evt => setLink(evt.target.value);

  const handleSubmit = evt => {
    evt.preventDefault();
    onAddPlace(name, link);
  }

  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpened])
 
  return (
    <PopupWithForm 
      name='place' 
      title='Новое место' 
      isOpened={isOpened} 
      onClose={onClose}
      submitBtnText="Создать"
      submitBtnSelectorType="add"
      onSubmit={handleSubmit}
    >
      <input 
        placeholder="Название" 
        value={name}
        onChange={onNameChange}
        required
        name="placeName" 
        id="place-name"
        type="text" 
        className="form__input form__input_value_place-name"
        minLength="2"
        maxLength="30"
      />
      <span className="form__error place-name-error">Заполните это поле</span>
      <input 
        placeholder="Ссылка на картинку" 
        value={link}
        onChange={onLinkChange}
        required
        name="imageLink" 
        id="image-link"
        type="url" 
        className="form__input form__input_value_image-link"
      />
      <span className="form__error image-link-error">Заполните это поле</span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;