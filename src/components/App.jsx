import { useEffect, useState } from "react";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";

export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopup, setIsImagePopup] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopup(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopup(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if(!isLiked) {
      api.toLike(card._id)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => {
        console.log(err);
    });
    } else {
      api.toDislike(card._id)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => {
        console.log(err);
    });
    }
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(res => {
      })
    .catch(err => {
      console.log(err);
    });
  }

  useEffect(() => {
    setIsLoading(true);
    Promise.all([api.getUserInfo(), api.getInitialCards()]) 
    .then(([user, cards]) => {
      setCurrentUser(user)
      setCards(cards);
      setIsLoading(false);
    })
    .catch(err => {
        console.log(err);
    });
  }, [])

  function handleUpdateUser(user, reset) {
    api.setUserInfo(user)
    .then(res => {
      setCurrentUser(res)
      closeAllPopups()
      reset()
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
        onEditProfile = {handleEditProfileClick}
        onEditAvatar = {handleEditAvatarClick}
        onAddPlace = {handleAddPlaceClick}
        onCardClick = {handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete = {handleCardDelete}
        cards={cards}
        isLoading={isLoading}
        />
        <Footer />

        <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
         />
        
        <PopupWithForm 
          formHeading='Обновить аватар'
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          <label className="form__field">
            <input
              type="url"
              className="form__input form__input_edit-avatar"
              name="avatar"
              placeholder="Ссылка на картинку"
              required
            />
            <span className="form__message-error avatar-message-error" />
          </label>
        </PopupWithForm>
        <PopupWithForm
          formHeading='Новое место'
          textBtn='Создать'
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
          <label className="form__field">
            <input
              type="text"
              className="form__input form__input_add-heading"
              name="heading"
              minLength={2}
              maxLength={30}
              placeholder="Название"
              required
            />
            <span className="form__message-error heading-message-error" />
          </label>
          <label className="form__field">
            <input
              type="url"
              className="form__input form__input_add-url"
              name="url"
              placeholder="Ссылка на картинку"
              required
            />
            <span className="form__message-error url-message-error" />
          </label>
        </PopupWithForm>
        <ImagePopup 
          card={selectedCard}
          isOpen={isImagePopup}
          onClose={closeAllPopups}
      />
      </div>
    </CurrentUserContext.Provider>
  );
}