import { BASE_URL } from "./auth";

class Api {
  constructor({
    serverUrl, 
    token, 
    userAddress,
    avatarAddress,
    cardsAddress,
    likeAddress,
  }) {
    this._serverUrl = serverUrl;
    this._token = token;
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

  getUserData(token) {
    return fetch(this._userUrl, {
      headers: {
        authorization: token
      }
    })
      .then(res => this._checkResponse(res));
  }

  getCards(token) {
    return fetch(this._cardsUrl, {
      headers: {
        authorization: token
      }
    })
      .then(res => this._checkResponse(res));
  }

  addCard(name, link, token) {
    return fetch(this._cardsUrl, {
      method: 'POST',
      headers: {
        authorization: token,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name,
        link,
      })
    })
      .then(res => this._checkResponse(res));
  }

  deleteCard = (id, token) => {
    return fetch(`${this._cardsUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: token,
      },
    })
      .then(res => this._checkResponse(res));
  }

  setLike = (cardId, token) => {
    return fetch(`${this._cardsUrl}/${cardId}${this._likeAddress}`, {
      method: 'PUT',
      headers: {
        authorization: token
      }
    })
      .then(res => this._checkResponse(res));
  }

  deleteLike = (cardId, token) => {
    return fetch(`${this._cardsUrl}/${cardId}${this._likeAddress}`, {
      method: 'DELETE',
      headers: {
        authorization: token
      }
    })
      .then(res => this._checkResponse(res));
  }

  editProfile(name, about, token) {
    return fetch(this._userUrl, {
      method: 'PATCH',
      headers: {
        authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        about,
      })
    })
      .then(res => this._checkResponse(res));
  }

  editAvatar(avatar, token) {
    return fetch(`${this._avatarUrl}`, {
      method: 'PATCH',
      headers: {
        authorization: token,
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