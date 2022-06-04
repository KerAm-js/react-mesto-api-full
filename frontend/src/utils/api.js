import { token, groupId } from "./constants";

class Api {
  constructor({
    serverUrl, 
    token, 
    groupId, 
    userAddress,
    avatarAddress,
    cardsAddress,
    likeAddress,
  }) {
    this._serverUrl = serverUrl;
    this._token = token;
    this._groupId = groupId;
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
    return fetch(this._userUrl, {
      headers: {
        authorization: this._token
      }
    })
      .then(res => this._checkResponse(res));
  }

  getCards() {
    return fetch(this._cardsUrl, {
      headers: {
        authorization: this._token
      }
    })
      .then(res => this._checkResponse(res));
  }

  addCard(name, link) {
    return fetch(this._cardsUrl, {
      method: 'POST',
      headers: {
        authorization: this._token,
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
      headers: {
        authorization: this._token,
      },
    })
      .then(res => this._checkResponse(res));
  }

  setLike = cardId => {
    return fetch(`${this._cardsUrl}/${cardId}${this._likeAddress}`, {
      method: 'PUT',
      headers: {
        authorization: this._token
      }
    })
      .then(res => this._checkResponse(res));
  }

  deleteLike = cardId => {
    return fetch(`${this._cardsUrl}/${cardId}${this._likeAddress}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
      .then(res => this._checkResponse(res));
  }

  editProfile(name, about) {
    return fetch(this._userUrl, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
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
        authorization: this._token,
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
  serverUrl: `https://nomoreparties.co/v1/${groupId}`,
  token,
  groupId,
  userAddress: '/users/me',
  avatarAddress: `/avatar`,
  cardsAddress: '/cards',
  likeAddress: '/likes',
});