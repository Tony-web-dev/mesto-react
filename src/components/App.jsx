import { useEffect, useState } from "react";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import api from "../utils/api.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";

export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopup, setIsImagePopup] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true)
    api.getInitialCards()
    .then(cards => {
       setCards(cards);
       setIsLoading(false)
     })
     .catch((err) => {
       console.log(err);
     });
 }, [])

  useEffect(() => {
    api.getUserInfo()
    .then(res => {
      setCurrentUser(res)
    })
    .catch((err) => {
      console.log(err);
    });
  }, [])

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopup(false);
  }

  function handleCardClick(item) {
    setSelectedCard(item);
    setIsImagePopup(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if(!isLiked) {
      api.toLike(card._id)
      .then(res => {
        setCards((state) => state.map((c) => c._id === card._id ? res : c));
      })
      .catch(err => {
        console.log(err);
      });
    } else {
      api.toDislike(card._id)
      .then(res => {
        setCards((state) => state.map((c) => c._id === card._id ? res : c));
      })
      .catch(err => {
        console.log(err);
      });
    }
  }

  //не отрабатывает отрисовка отфильтрованных карточек, не понимаю
  //как сказать "отрисуй всё кроме удаленной"
  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(res => {
      setCards(cards.filter(card => {
        return card._id;
      }));
    })
    .catch(err => {
      console.log(err);
    });
  }

  function handleUpdateUser(user, reset) {
    api.setUserInfo(user)
    .then(res => {
      setCurrentUser(res);
      closeAllPopups();
      reset();
    })
    .catch(err => {
      console.log(err);
    });
  }

  function handleUpdateAvatar(user, reset) {
    api.setAvatar(user)
    .then(res => {
      setCurrentUser(res);
      closeAllPopups();
      reset();
    })
    .catch(err => {
      console.log(err);
    });
  }

  //не закрывает попап и не рендерит карточки 
  function handleAddPlaceSubmit(cards, reset) {
    api.addCard(cards)
    .then(res => {
      setCards([res, ...cards]);
      closeAllPopups();
      reset();
    })
    .catch(err => {
      console.log(err);
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />

        <Main
          cards={cards}
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete ={handleCardDelete}
          isLoading={isLoading}
        />

        <Footer />

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
          onAddPlace={handleAddPlaceSubmit}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopup}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
