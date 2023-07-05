import { useContext } from "react";
import CurrentUserContext from '../../contexts/CurrentUserContext.js';

export default function Card( {item, onCardClick, onCardDelete} ) {
    const currentUser = useContext(CurrentUserContext);

    return (
        <div className="gallery__item">
            {currentUser._id === item.owner._id && 
            <button 
            className="gallery__trash" 
            type="button" 
            aria-label="Удалить"
            onClick={onCardDelete}
            />}
            <img 
            className="gallery__img"
            src={item.link}
            alt={`Фото ${item.name}`}
            onClick={() => onCardClick( {link: item.link, name: item.name} )}
            />
            <div className="gallery__place">
                <h2 className="gallery__heading">{item.name}</h2>
                <div className="gallery__like-block">
                    <button
                        className="gallery__like"
                        type="button"
                        aria-label="Поставить лайк"
                    />
                    <p className="gallery__like-counter">{item.likes.length}</p>
                </div>
            </div>
        </div>
    )
}