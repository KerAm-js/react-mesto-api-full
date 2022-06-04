import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

const EditProfilePopup = ({isOpened, onClose, onUpdateUser}) => {

  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  const onChangeName = evt => setName(evt.target.value);
  const onChangeDescription = evt => setDescription(evt.target.value);
  const handleSubmit = evt => {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpened])

  return (
    <PopupWithForm 
        name='profile' 
        title='Редактировать профиль' 
        isOpened={isOpened} 
        onClose={onClose}
        onSubmit={handleSubmit}
        submitBtnText="Сохранить"
      >
        <input 
          placeholder="имя" 
          value={name || ''}
          onChange={onChangeName}
          required
          name="username" 
          id="username"
          type="text" 
          className="form__input form__input_value_username"
          minLength="2"
          maxLength="40"
        />
        <span className="form__error username-error">Заполните это поле</span>
        <input 
          placeholder="описание" 
          value={description || ''}
          onChange={onChangeDescription}
          required
          name="description" 
          id="description"
          type="text" 
          className="form__input form__input_value_about"
          minLength="2"
          maxLength="200"
        />
        <span className="form__error description-error">Заполните это поле</span>
      </PopupWithForm>
  )
}

export default EditProfilePopup;