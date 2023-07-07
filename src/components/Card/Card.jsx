import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <div className="gallery__item">
      {isOwn && (
        <button
          className="gallery__trash"
          type="button"
          aria-label="Удалить"
          onClick={() => onCardDelete(card._id)}
        />
      )}
      <img
        className="gallery__img"
        src={card.link}
        alt={`Фото ${card.name}`}
        onClick={() => onCardClick({ link: card.link, name: card.name })}
      />
      <div className="gallery__place">
        <h2 className="gallery__heading">{card.name}</h2>
        <div className="gallery__like-block">
          <button
            className={`gallery__like ${isLiked && `gallery__like_active`}`}
            type="button"
            aria-label="Поставить лайк"
            onClick={handleLikeClick}
          />
          <p className="gallery__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}
