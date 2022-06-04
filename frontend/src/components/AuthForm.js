import React from "react";
import { NavLink } from "react-router-dom";
 
const AuthForm = ({
  title, 
  submitTitle, 
  onSubmit, 
  email, 
  password, 
  onChangeEmail, 
  onChangePassword
}) => {

  const submitHanlder = evt => {
    evt.preventDefault();
    onSubmit();
  }

  return (
    <div className="auth">
      <h2 className="auth__title">{title}</h2>
      <form className="form form_type_auth" onSubmit={submitHanlder}>
        <div className="form__auth-inputs-wrapper">
          <input 
            value={email}
            onChange={onChangeEmail}
            placeholder="Email" 
            type="email" 
            className="form__input form__input_type_auth" 
          />
          <span className="form__error username-error">Заполните это поле</span>
          <input 
            value={password}
            onChange={onChangePassword}
            placeholder="Пароль" 
            type="password" 
            className="form__input form__input_type_auth" 
          />
          <span className="form__error username-error">Заполните это поле</span>
        </div>
        <button className="form__button form__button_type_auth">{submitTitle}</button>
      </form>
      <NavLink to="/sign-in" className={`link ${title === 'Регистрация' ? '' : 'link_hidden'}`}>Уже зарегистрированы? Войти</NavLink>
    </div>
  )
}

export default AuthForm;