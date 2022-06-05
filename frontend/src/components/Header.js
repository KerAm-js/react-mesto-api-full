import React, { useState } from 'react';
import logo from '../images/VectorLogo.svg';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const Header = ({loggedIn, email, logout, accountInfoVisible, toggleAccountInfoVisible}) => {
  
  const { pathname } = useHistory().location;
  
  let accountInfo;
  
  if (pathname === '/' && loggedIn) {
    accountInfo = (<div className='header__account-info'>
        <p className='header__email'>{email}</p>
        <button onClick={logout} className='button header__account-button header__account-button_type_logout'>Выйти</button>
      </div>
    )
  } else if (pathname === '/sign-in') {
    accountInfo = (<NavLink className="button header__account-button" to="./sign-up" >Регистрация</NavLink>)
  } else if (pathname === '/sign-up') {
    accountInfo = (<NavLink className="button header__account-button" to="./sign-in" >Войти</NavLink>)
  }

  return (
    <header className={`header ${!loggedIn ? 'header_auth' : ''}`}>
      <div className='header__logo-wrapper'>
        <img className="logo header__logo" src={logo} alt="Логотип"/>
        <button 
          onClick={toggleAccountInfoVisible} 
          className={
            `button header__menu-burger ${
              accountInfoVisible 
                ? 'header__menu-burger_type_opened' 
                : 'header__menu-burger_type_closed'
            }`
          } 
        />
      </div>
      {accountInfo}
    </header>
  )
}

export default withRouter(Header);