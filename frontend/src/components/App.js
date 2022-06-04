import React, { useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Login from "./Login";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";
import { Route, Switch } from "react-router-dom";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import { auth, reg, authWithJWT } from "../utils/auth";
import { useHistory } from "react-router-dom";

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [accountInfoVisible, setAccountInfoVisible] = useState(false);
  const [action, setAction] = useState(() => () => {});
  const [cards, setCards] = useState([]);
  const [infoTooltip, setInfoTooltip] = useState('');
  const [isEditProfilePopupOpened, setIsEditProfilePopupOpened] = useState(false);
  const [isEditAvatarPopupOpened, setIsEditAvatarPopupOpened] = useState(false);
  const [isAddPlaceopupOpened, setIsAddPlaceopupOpened] = useState(false);
  const [isConfirmPopupOpened, setIsConfirmPopupOpened] = useState(false);
  const [isInfoTooltipOpened, setIsInfoTooltipOpened] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [currentUser, setCurrentUser] = useState({
    name: '',
    avatar: '',
    about: '',
    _id: '',
    cohort: '',
  });

  const history = useHistory();

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpened(true);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpened(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlaceopupOpened(true);
  }

  const handleCardClick = card => {
    setSelectedCard(card);
  }

  const openInfoTooltip = status => { 
    setInfoTooltip(status);
    setIsInfoTooltipOpened(true);
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpened(false);
    setIsEditProfilePopupOpened(false);
    setIsAddPlaceopupOpened(false);
    setIsConfirmPopupOpened(false);
    setIsInfoTooltipOpened(false);
    setSelectedCard(null);
  }

  const handleUpdateUser = ({name, about}) => {
    api.editProfile(name, about)
      .then(userData => {
        setCurrentUser(userData)
        closeAllPopups()
      })
      .catch(e => console.log(e))
  }

  const handleUpdateAvatar = avatar => {
    api.editAvatar(avatar) 
      .then(userData => {
        setCurrentUser(userData)
        closeAllPopups()
      })
      .catch(e => console.log(e))
  }

  const handleAddPlace = (name, link) => {
    api.addCard(name, link)
      .then(card => {
        setCards([card, ...cards])
        closeAllPopups()
      })
      .catch(e => console.log(e))
  }

  const handleActionConfirm = () => {
    action();
    closeConfirmPopupHanlder();
  }

  const closeConfirmPopupHanlder = () => {
    setAction(() => () => {});
    setIsConfirmPopupOpened(false);
  }

  const handleCardLike = card => {
    const isLiked = card.likes.some(user => user._id === currentUser._id);
    if (!isLiked) {
      api.setLike(card._id)
        .then(card => setCards(prev => prev.map(item => item._id === card._id ? card : item)))
        .catch(e => console.log(e))
    } else {
      api.deleteLike(card._id)
        .then(card => setCards(prev => prev.map(item => item._id === card._id ? card : item)))
        .catch(e => console.log(e))
    }
  }

  const handleCardDelete = id => {
    setIsConfirmPopupOpened(true);
    setAction(() => {
      return () => {
        api.deleteCard(id)
          .then(() => setCards(prev => prev.filter(card => card._id !== id)))
          .catch(e => console.log(e))
      }
    })
  }

  const onAuthEmailChangeHandler = evt => setAuthEmail(evt.target.value);
  const onAuthPasswordChangeHandler = evt => setAuthPassword(evt.target.value);
  const clearAuthInputs = () => {
    setAuthEmail('');
    setAuthPassword('');
  }

  const onRegisterEmailChangeHandler = evt => setRegisterEmail(evt.target.value);
  const onRegisterPasswordChangeHandler = evt => setRegisterPassword(evt.target.value);
  const clearRegisterInputs = () => {
    setRegisterEmail('');
    setRegisterPassword('');
  }

  const authorise = () => {
    auth(authEmail, authPassword)
      .then(res => {
        clearAuthInputs()
        setCurrentUserEmail(authEmail)
        setLoggedIn(true)
        history.push('/')
      })
      .catch(e => {
        console.log(e)
      })
  }

  const register = () => {
    reg(registerEmail, registerPassword) 
      .then(res => {
        openInfoTooltip('success')
        clearRegisterInputs()
        setAuthEmail(res.data.email)
        history.push('/signin')
      })
      .catch(e => {
        console.log(e)
        openInfoTooltip('error')
      })
  }

  const autoAuth = () => {
    authWithJWT()
      .then(res => {
        if (res.data.email) {
          setCurrentUserEmail(res.data.email)
          setLoggedIn(true)
          history.push('/')
        }
      })
      .catch(e => {
        console.log(e)
      })
  }

  const logout = () => {
    setCurrentUserEmail('');
    setLoggedIn(false);
    history.push('/sign-in');
  }

  const toggleAccountInfoVisible = () => setAccountInfoVisible(!accountInfoVisible);

  const closeByEscape = (evt) => {
    if (evt.key === 'Escape') {
      closeAllPopups();
    }
  }

  useEffect(() => {
    api.getUserData()
      .then(userData => setCurrentUser(userData))
      .catch(e => console.log(e))
    api.getCards()
      .then(cards => setCards(cards))
      .catch(e => console.log(e))
    autoAuth();
    document.addEventListener('keydown', closeByEscape);
    return () => {
      document.removeEventListener('keydown', closeByEscape);
    }
  }, [])

  return (
    <CurrentUserContext.Provider className="App" value={currentUser}>
      <div className={`content ${
            loggedIn 
              ? accountInfoVisible ? 'content_account-info-visible' : ''
              : 'content_account-info-visible'
          }
        `}
      >
        <Header 
          loggedIn={loggedIn}
          email={currentUserEmail}
          logout={logout}
          toggleAccountInfoVisible={toggleAccountInfoVisible}
          accountInfoVisible={accountInfoVisible}
        />
        <Switch>
          <Route 
            path="/sign-in" 
          >
            <Login 
              email={authEmail} 
              setEmail={onAuthEmailChangeHandler}
              password={authPassword}
              setPassword={onAuthPasswordChangeHandler} 
              authorize={authorise}
            />
          </Route>
          <Route 
            path="/sign-up" 
          >
            <Register 
              email={registerEmail} 
              setEmail={onRegisterEmailChangeHandler}
              password={registerPassword}
              setPassword={onRegisterPasswordChangeHandler} 
              register={register}
            />
          </Route>
          <ProtectedRoute 
            path="/"
            loggedIn={loggedIn}
            component={Main}
            cards={cards}
            onCardDelete={handleCardDelete}
            onCardLike={handleCardLike}
            onEditAvatar={handleEditAvatarClick} 
            onEditProfile={handleEditProfileClick} 
            onAddPlace={handleAddPlaceClick} 
            onCardClick={handleCardClick}
          />
        </Switch>
        
        {
          loggedIn && <Footer />
        }
        
        <EditProfilePopup 
          isOpened={isEditProfilePopupOpened}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup 
          isOpened={isEditAvatarPopupOpened}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup 
          isOpened={isAddPlaceopupOpened}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />

        <ImagePopup selectedCard={selectedCard} onClose={closeAllPopups}/>

        <ConfirmPopup 
          onConfirm={handleActionConfirm}
          onClose={closeConfirmPopupHanlder}
          isOpened={isConfirmPopupOpened}
        />

        <InfoTooltip 
          status={infoTooltip}
          title={
            infoTooltip === 'success' 
              ? 'Вы успешно зарегистрировались!'
              : 'Что-то пошло не так! Попробуйте ещё раз.'
          }
          isOpened={isInfoTooltipOpened}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
