export const BASE_URL = 'http://localhost:3000';

const checkResponse = (res) => {
  try {
    if (res.ok) {
      return res.json();
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

export const authWithJWT = () => {
  //jwt should be in cookies
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    }
  })
    .then(res => {
      return checkResponse(res);
    })
}