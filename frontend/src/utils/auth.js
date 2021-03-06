export const BASE_URL = 'https://api.amir.projects.mesto.nomoredomains.xyz';

const checkResponse = (res) => {
  try {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  } catch (e) {
    return e;
  }
}

export const reg = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password,
      })
    })
      .then(res => {
        return checkResponse(res);
      })
}

export const auth = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password,
      })
    })
      .then(res => {
        return checkResponse(res);
      })
}

export const authWithJWT = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
    .then(res => {
      return checkResponse(res);
    })
}