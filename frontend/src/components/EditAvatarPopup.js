import React, { useEffect, useRef } from "react"
import PopupWithForm from "./PopupWithForm"

const EditAvatarPopup = ({
  onClose,
  isOpened,
  onUpdateAvatar,
}) => {

  const link = useRef();

  const handleSubmit = evt => {
    evt.preventDefault();
    onUpdateAvatar(link.current.value);
  }

  useEffect(() => {
    link.current.value = '';
  }, [isOpened])

  return (
    <PopupWithForm 
        name='avatar' 
        title='Обновить аватар' 
        isOpened={isOpened} 
        onSubmit={handleSubmit}
        onClose={onClose}
        submitBtnText="Сохранить"
      >
      <input 
        ref={link}
        placeholder="Ссылка на картинку" 
        required
        name="avatarLink" 
        id="avatar-link"
        type="url" 
        className="form__input form__input_value_avatar-link"
      />
      <span className="form__error avatar-link-error">Заполните это поле</span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;