class Api {
  constructor({ address, token }) {
    this._address = address;
    this._token = token;
  }

  async getUserData() {
    const res = await fetch(`${this._address}/users/me`, {
      headers: {
        authorization: this._token,
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
        authorization: this._token,
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
        authorization: this._token,
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
        authorization: this._token,
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
        authorization: this._token,
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
    const res = await fetch(`${this._address}/cards/` + cardId, {
      method: "DELETE",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      return res.json();
    }
    return await Promise.reject(`Error: ${res.status}`);
  }

  async changeLikeCardStatus(cardId, isLiked) {
    const res = await fetch(`${this._address}/cards/likes/` + cardId, {
      method: isLiked ? "PUT" : "DELETE",
      headers: {
        authorization: this._token,
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
  address: "https://around.nomoreparties.co/v1/cohort-1-es",
  token: "2be75b7b-0f52-418b-b96c-41c3ad1377b3",
});

export default api;
