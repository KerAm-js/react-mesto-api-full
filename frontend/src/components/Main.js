import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

export default function Main({
  cards,
  onEditAvatar, 
  onEditProfile, 
  onAddPlace, 
  onCardClick,
  onCardLike,
  onCardDelete,
}) {

  const currentUser = useContext(CurrentUserContext);
  return (
    <main className="main">

      <section className="profile">
        <div className="profile__avatar-wrapper">
          <img className="profile__avatar" src={currentUser.avatar} alt="Аватарка"/>
          <button className="button profile__edit-avatar-btn" onClick={onEditAvatar}/>
        </div>
        <div className="profile__info">
          <h1 className="profile__username">
            {currentUser.name}
          </h1>
          <button aria-label="редактировать профиль" onClick={onEditProfile} type="button" className="button profile__edit-button"/>
          <p className="profile__about">
            {currentUser.about}
          </p>
        </div>
        <button type="button" aria-label="добавить пост" onClick={onAddPlace} className="button profile__add-place-button"/>
      </section>

      <section className="elements"> 
        <ul className="elements__list">
          {
            cards.map(item => (
              <Card 
                key={item._id} 
                card={item} 
                onCardClick={onCardClick} 
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            ))
          }
        </ul>
      </section>

    </main>
  )
}