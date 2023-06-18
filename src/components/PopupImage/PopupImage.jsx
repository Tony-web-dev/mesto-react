export default function PopupImage() {
    return (
        <div className="popup popup_big-picture">
            <div className="popup__photo-container">
            <button
                className="popup__close-button"
                type="button"
                aria-label="Закрыть"
            />
            <img
                className="popup__img"
                src="#"
                alt="Картинка" />
            <h2 className="popup__img-heading"> </h2>
            </div>
        </div>
    )
}