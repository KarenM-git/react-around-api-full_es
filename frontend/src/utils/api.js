class Api {
  constructor({ address}) {
    this._address = address;
  }

  async getUserData(token) {
    const res = await fetch(`${this._address}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      return res.json();
    }
    return await Promise.reject(`Error: ${res.status}`);
  }

  async getInitialCards(token) {
    const res = await fetch(`${this._address}/cards`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      return res.json();
    }
    return await Promise.reject(`Error: ${res.status}`);
  }

  async saveProfileData({ name, about }, token) {
    const res = await fetch(`${this._address}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
    if (res.ok) {
      return res.json();
    }
    return await Promise.reject(`Error: ${res.status}`);
  }

  async updateProfilePic({ avatar }, token) {
    const res = await fetch(`${this._address}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    });
    if (res.ok) {
      return res.json();
    }
    return await Promise.reject(`Error: ${res.status}`);
  }

  async addCardToServer({ name, link }, token) {
    const res = await fetch(`${this._address}/cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
    if (res.ok) {
      return res.json();
    }
    return await Promise.reject(`Error: ${res.status}`);
  }

  async deleteCard(cardId, token) {
    const res = await fetch(`${this._address}/cards/` + cardId, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      return res.json();
    }
    return await Promise.reject(`Error: ${res.status}`);
  }

  async changeLikeCardStatus(cardId, isLiked, token) {
    const res = await fetch(`${this._address}/cards/likes/` + cardId, {
      method: isLiked ? "PUT" : "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      return res.json();
    }
    return await Promise.reject(`Error: ${res.status}`);
  }
}

const api = new Api({
  address: "https://api.around-full-km.students.nomoredomainssbs.ru",
});

export default api;
