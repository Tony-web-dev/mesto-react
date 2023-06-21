import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import PopupImage from "./PopupImage/PopupImage.jsx";
import React from "react";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isImagePopup, setIsImagePopup] = React.useState(false);

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
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsImagePopup(false)
  }

  function handleCardClick(item) {
    setSelectedCard(item);
    setIsImagePopup(true);
  }

  return (
    <div className="page">
      <Header />

      <Main
      onEditProfile = {handleEditProfileClick}
      onEditAvatar = {handleEditAvatarClick}
      onAddPlace = {handleAddPlaceClick}
      onCardClick = {handleCardClick}
      />

      <Footer />

      <PopupWithForm 
        popupName='edit-profile'
        formHeading='Редактировать профиль'
        textBtn='Сохранить'
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
            required=""
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
            required=""
          />
          <span className="form__message-error about-message-error" />
        </label>
      </PopupWithForm>

      <PopupWithForm 
        popupName='edit-avatar'
        formHeading='Обновить аватар'
        textBtn='Сохранить'
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <label className="form__field">
          <input
            type="url"
            className="form__input form__input_edit-avatar"
            name="avatar"
            placeholder="Ссылка на картинку"
            required=""
          />
          <span className="form__message-error avatar-message-error" />
        </label>
      </PopupWithForm>

      <PopupWithForm 
        popupName='add-gallery-item'
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
            required=""
          />
          <span className="form__message-error heading-message-error" />
        </label>
        <label className="form__field">
          <input
            type="url"
            className="form__input form__input_add-url"
            name="url"
            placeholder="Ссылка на картинку"
            required=""
          />
          <span className="form__message-error url-message-error" />
        </label>
      </PopupWithForm>

      <PopupWithForm 
        popupName='delete-gallery-item'
        formHeading='Вы уверены?'
        textBtn='Да'
      />

     <PopupImage 
      item={selectedCard}
      isOpen={isImagePopup}
      onClose={closeAllPopups}
     />


    </div>
  );
}

export default App;
