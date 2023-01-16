const BASE_URL = "https://register.nomoreparties.co";

export const register = ({ email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password })
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw new Error(res.error);
        }
      })
};


export const authorize = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      'Accept': "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password}),
  })
    .then((response) => response.json())
      .then((data) => {
        if (data.token) {
        return data;
      }
    })
    .catch((err) => console.log(err));
};


export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((res) => res);
}; 