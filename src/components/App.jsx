import { useEffect, useState } from "react";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
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
  const [isDeleteCard, setIsDeleteCard] = useState(false);
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
    setIsDeleteCard(false);
  }

  function handleCardClick(item) {
    setSelectedCard(item);
    setIsImagePopup(true);
  }

  function handleCardDelete() {
    setIsDeleteCard(true);
  }

  // function handleCardLike(item) {
  //   const isLiked = item.likes.some(item => item._id === currentUser._id);
  //   api.toLike(item._id, !isLiked)
  //   .then(newCard =>
  //     setCards((state) => state.map((c) => c._id === item._id ? newCard : c)))
  // }


  useEffect(() => {
    setIsLoading(true);
    Promise.all([api.getUserInfo(), api.getInitialCards()]) 
    .then(([user, items]) => {
      setCurrentUser(user)
      setCards(items);
      setIsLoading(false);
    })
    .catch(err => {
        console.log(err);
    });
}, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
        onEditProfile = {handleEditProfileClick}
        onEditAvatar = {handleEditAvatarClick}
        onAddPlace = {handleAddPlaceClick}
        onCardClick = {handleCardClick}
        onCardDelete = {handleCardDelete}
        cards={cards}
        isLoading={isLoading}
        />
        <Footer />
        <PopupWithForm
          formHeading='Редактировать профиль'
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        >
          <label className="form__field">
            <input
              type="text"
              className="form__input form__input_edit-name"
              name="person"
              minLength={2}
              maxLength={40}
              placeholder="Ваше имя"
              required
            />
            <span className="form__message-error person-message-error" />
          </label>
          <label className="form__field">
            <input
              type="text"
              className="form__input form__input_edit-about"
              name="about"
              minLength={2}
              maxLength={200}
              placeholder="Ваше призвание"
              required
            />
            <span className="form__message-error about-message-error" />
          </label>
        </PopupWithForm>
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
        <PopupWithForm
          formHeading='Вы уверены?'
          textBtn='Да'
          isOpen={isDeleteCard}
          onClose={closeAllPopups}
        />
      <ImagePopup 
        item={selectedCard}
        isOpen={isImagePopup}
        onClose={closeAllPopups}
      />
      </div>
    </CurrentUserContext.Provider>
  );
}