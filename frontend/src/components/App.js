import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import { Route, Switch, useHistory } from 'react-router-dom';
import * as auth from "../utils/auth";

function App() {
  const [isOpenEditAvatar, setIsOpenEditAvatar] = useState(false);
  const [isOpenEditProfile, setIsOpenEditProfile] = useState(false);
  const [isOpenAddPlace, setIsOpenAddPlace] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isOpenImage, setIsOpenImage] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [regIn, setRegIn] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const history = useHistory();
  const [infoTooltip, setInfoTooltip] = useState(false);

  const handleCheckToken = () => {
      auth
        .checkToken()
        .then((res) => {
          if (res.ok) {
            setLoggedIn(true);
            setUserEmail(res.data.email);
            history.push('/');
          }
        })
        .catch((err) => {
          console.log(err);
        });
  };

  useEffect(() => {
    handleCheckToken();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn){
    api
      .getUserInfo()
      .then((res) => setCurrentUser(res.message))
      .catch((err) => console.log(`Ошибка: ${err}`));
  }}, [loggedIn]);

  const handleEditAvatarClick = () => {
    setIsOpenEditAvatar(true);
  };

  const handleEditProfileClick = () => {
    setIsOpenEditProfile(true);
  };

  const handleAddPlaceClick = () => {
    setIsOpenAddPlace(true);
  };

  const handleCardClick = (selectedCard) => {
    setSelectedCard(selectedCard);
    setIsOpenImage(true);
  };

  const closeAllPopups = () => {
    setIsOpenEditAvatar(false);
    setIsOpenEditProfile(false);
    setIsOpenAddPlace(false);
    setIsOpenImage(false);
    setInfoTooltip(false);
  };

  const handleUpdateUser = (userInfo) => {
    api
      .addUserInfo(userInfo)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  };

  const handleUpdateAvatar = (data) => {
    api
      .addAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  };

  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (loggedIn){
      api
        .getCards()
        .then((res) => {
          setCards(res);
        })
        .catch((err) => console.log(`Ошибка: ${err}`));
    }
    }
    , [loggedIn]);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }

  function handleCardDelete(card) {
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }

  const handleAddPlaceSubmit = (data) => {
    api
      .handleAddCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  };

  const onLogin = (userEmail, password) => {
    auth
      .authorize(userEmail, password)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setUserEmail(userEmail);
          history.push('/');
        }
      })
      .catch((err) => {
        setInfoTooltip(true);
        console.log(`Ошибка: ${err}`);
      });
  };

  const onRegister = (data) => {
    auth
      .register(data)
      .then((res) => {
        if (res) {
          setInfoTooltip(true);
          setRegIn(true);
          history.push('/sign-in');
        }
      })
      .catch((err) => {
        setInfoTooltip(true);
        setRegIn(false);
        console.log(`Ошибка: ${err}`);
      });
  };

  function handleLogExit() {
    setLoggedIn(false);
    history.push('/sign-in');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page__content'>
        <Header email={userEmail} handleLogExit={handleLogExit} />
        <Switch>
          <Route path='/sign-in'>
            <Login onLogin={onLogin} />
          </Route>
          <Route path='/sign-up'>
            <Register onRegister={onRegister} />
          </Route>
          <ProtectedRoute
            exact
            path='/'
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            loggedIn={loggedIn}
          />
        </Switch>
        <Footer />
        <EditProfilePopup
          isOpen={isOpenEditProfile}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isOpenAddPlace}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isOpenEditAvatar}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateAvatar}
        />
        <PopupWithForm
          name='delete-card'
          title='Вы уверены?'
          btnTitle='Да'
        ></PopupWithForm>
        <ImagePopup
          isOpen={isOpenImage}
          name={selectedCard && selectedCard.name}
          link={selectedCard && selectedCard.link}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          infoTooltip={infoTooltip}
          regIn={regIn}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
