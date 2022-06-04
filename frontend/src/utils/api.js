import { BASE_URL } from './auth';

class Api {
  constructor({
    serverUrl, 
    userAddress,
    avatarAddress,
    cardsAddress,
    likeAddress,
  }) {
    this._serverUrl = serverUrl;
    this._userUrl = `${this._serverUrl}${userAddress}`;
    this._avatarUrl = `${this._userUrl}${avatarAddress}`;
    this._cardsUrl = `${this._serverUrl}${cardsAddress}`;
    this._likeAddress = likeAddress;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserData() {
    return fetch(this._userUrl)
      .then(res => this._checkResponse(res));
  }

  getCards() {
    return fetch(this._cardsUrl)
      .then(res => this._checkResponse(res));
  }

  addCard(name, link) {
    return fetch(this._cardsUrl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name,
        link,
      })
    })
      .then(res => this._checkResponse(res));
  }

  deleteCard = id => {
    return fetch(`${this._cardsUrl}/${id}`, {
      method: 'DELETE',
    })
      .then(res => this._checkResponse(res));
  }

  setLike = cardId => {
    return fetch(`${this._cardsUrl}/${cardId}${this._likeAddress}`, {
      method: 'PUT',
    })
      .then(res => this._checkResponse(res));
  }

  deleteLike = cardId => {
    return fetch(`${this._cardsUrl}/${cardId}${this._likeAddress}`, {
      method: 'DELETE',
    })
      .then(res => this._checkResponse(res));
  }

  editProfile(name, about) {
    return fetch(this._userUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        about,
      })
    })
      .then(res => this._checkResponse(res));
  }

  editAvatar(avatar) {
    return fetch(`${this._avatarUrl}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar,
      })
    })
      .then(res => this._checkResponse(res));
  }
}

export default new Api({
  serverUrl: BASE_URL,
  userAddress: '/users/me',
  avatarAddress: `/avatar`,
  cardsAddress: '/cards',
  likeAddress: '/likes',
});