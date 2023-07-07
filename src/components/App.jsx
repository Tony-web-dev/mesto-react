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
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";

export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopup, setIsImagePopup] = useState(false);
  const [isRemoveCardPopupOpen, setIsRemoveCardPopupOpen] = useState(false);
  const [isDeletedCard, setIsDeletedCard] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);

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

  function handleRemoveCardClick(cardID) {
    setIsDeletedCard(cardID);
    setIsRemoveCardPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopup(false);
    setIsRemoveCardPopupOpen(false);
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

  function handleDeleteCardSubmit(e) {
    e.preventDefault();
    setIsSending(true);
    api.deleteCard(isDeletedCard)
    .then(res => {
      setCards(cards.filter(card => {
        return card._id !== isDeletedCard;
      }))
      closeAllPopups();
      setIsSending(false);
    })
    .catch(err => {
      console.log(err);
    });
  }

  function handleUpdateUser(user, reset) {
    setIsSending(true);
    api.setUserInfo(user)
    .then(res => {
      setCurrentUser(res);
      closeAllPopups();
      setIsSending(false);
      reset();
    })
    .catch(err => {
      console.log(err);
    });
  }

  function handleUpdateAvatar(user, reset) {
    setIsSending(true);
    api.setAvatar(user)
    .then(res => {
      setCurrentUser(res);
      closeAllPopups();
      setIsSending(false);
      reset();
    })
    .catch(err => {
      console.log(err);
    });
  }

  function handleAddPlaceSubmit(newCard, reset) {
    setIsSending(true);
    api.addCard(newCard)
    .then(res => {
      setCards([res, ...cards]);
      closeAllPopups();
      setIsSending(false);
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
          onCardDelete ={handleRemoveCardClick}
          isLoading={isLoading}
        />

        <Footer />

        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isSending={isSending}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isSending={isSending}
        />

        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isSending={isSending}
        />

        <PopupWithForm
          formHeading='Вы уверены?'
          textBtn='Да'
          isOpen={isRemoveCardPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleDeleteCardSubmit}
          isSending={isSending}
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
