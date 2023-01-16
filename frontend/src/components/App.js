import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import Login from "./Login.js";
import Register from "./Register.js";
import InfoTooltip from "./InfoTooltip.js";
import ProtectedRoute from "./ProtectedRoute.js";

import api from "../utils/api.js";
import * as auth from "../utils/auth.js";

import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [userData, setUserData] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      auth.getContent(token).then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setUserData({ ...res.data });
          history.push("/");
        }
      });
    }
  }, [history]); 

  React.useEffect(() => {
    api
      .getUserData()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(0);
  const [cards, setCards] = React.useState([]);

  const [isRegistered, setIsRegistered] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards([...res]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(0);
    setIsInfoTooltipOpen(false);
  }

  function handleUpdateUser(name, about) {
    api
      .saveProfileData(name, about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(avatar) {
    api
      .updateProfilePic(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(name, link) {
    api
      .addCardToServer(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleRegister(values) {
    auth
      .register(values)
      .then((res) => {
        history.push("/signin");
        setIsRegistered(true);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
      });
  }

  function handleLogin({ email, password }, setValues) {
    if (!email || !password) {
      return;
    }
    auth
      .authorize({ email, password })
      .then((res) => {
        if (res.token) {
          setValues({ email: "", password: "" });
          setIsLoggedIn(true);
          history.push("/");
          localStorage.setItem("token", res.token);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltipOpen(true);
      });
  }

  function signOut(evt) {
    evt.preventDefault();
    localStorage.removeItem("token");
    history.push("/signin");
  }

  return (
    <div className='page'>
      <CurrentUserContext.Provider value={currentUser}>
        <Header onLogout={signOut} userData={userData} />
        <Switch>
          <Route path='/signup'>
            <Register onSubmit={handleRegister} />
          </Route>
          <Route path='/signin'>
            <Login
              onSubmit={handleLogin}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              handleLogin={handleLogin}
            />
          </Route>
          <ProtectedRoute isLoggedIn={isLoggedIn} path='/'>
            <Main
              onEditProfileClick={handleEditProfileClick}
              onEditAvatarClick={handleEditAvatarClick}
              onAddPlaceClick={handleAddPlaceClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              onCardClick={handleCardClick}
            />
          </ProtectedRoute>
        </Switch>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <InfoTooltip
          isRegistered={isRegistered}
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
        />

        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
