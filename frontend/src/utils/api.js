class Api {
  constructor({ address }) {
    this._address = address;
    this._token = localStorage.getItem("token");
  }

  async getUserData() {
    const res = await fetch(`${this._address}/users/me`, {
      headers: {
        authorization: `Bearer ${this._token}`,
      },
    });
    if (res.ok) {
      return res.json();
    }
    return await Promise.reject(`Error: ${res.status}`);
  }

  async getInitialCards() {
    const res = await fetch(`${this._address}/cards`, {
      headers: {
        authorization: `Bearer ${this._token}`,
      },
    });
    if (res.ok) {
      return res.json();
    }
    return await Promise.reject(`Error: ${res.status}`);
  }

  async saveProfileData({ name, about }) {
    const res = await fetch(`${this._address}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${this._token}`,
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

  async updateProfilePic({ avatar }) {
    const res = await fetch(`${this._address}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${this._token}`,
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

  async addCardToServer({ name, link }) {
    const res = await fetch(`${this._address}/cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${this._token}`,
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

  async deleteCard(cardId) {
    const res = await fetch(`${this._address}/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${this._token}`,
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      return res.json();
    }
    return await Promise.reject(`Error: ${res.status}`);
  }

  async changeLikeCardStatus(cardId, isLiked) {
    const res = await fetch(`${this._address}/cards/${cardId}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: {
        authorization: `Bearer ${this._token}`,
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
