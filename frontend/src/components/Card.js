import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


const Card = ({card, onCardClick, onCardLike, onCardDelete}) => {
  const cardClickHandler = () => onCardClick(card);
  const cardLikeHandler = () => onCardLike(card);
  const cardDeleteHadnler = () => onCardDelete(card._id);
  
  const currentUser = useContext(CurrentUserContext);

  const isOwn = currentUser._id === card.owner;
  const isLiked = card.likes.some(id => id === currentUser._id);
  const likeBtnClass = `button element__like-button ${ isLiked ? 'element__like-button_active' : null }`;

  return (
    <li className="element">
      <div className="element__image" style={{ backgroundImage: `url(${card.link})` }} onClick={cardClickHandler} />
      {
        isOwn && (<button onClick={cardDeleteHadnler} type="button" aria-label="удалить" className="button element__delete-button"></button>)
      }
      <div className="element__info">
        <h2 className="element__title">
          {card.name}
        </h2>
        <div className="element__like-container">
          <button onClick={cardLikeHandler} type="button" aria-label="лайк" className={likeBtnClass}>
          </button>
          <p className="element__like-count">{card.likes.length}</p>
        </div>
      </div>
    </li>
  )
}

export default Card;