export default function ImagePopup( {item, isOpen, onClose} ) {
    return (
        <div className={`popup popup_big-picture ${isOpen && 'popup_opened'}`}>
            <div className="popup__photo-container">
                <button
                    className="popup__close-button"
                    type="button"
                    aria-label="Закрыть"
                    onClick={onClose}
                />
                <img
                    className="popup__img"
                    src={item.link}
                    alt={`Фото ${item.name}`} 
                />
                <h2 className="popup__img-heading">{item.name}</h2>
            </div>
        </div>
    )
}