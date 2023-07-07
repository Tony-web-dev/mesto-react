export default function PopupWithForm({ formHeading, textBtn, children, isOpen, onClose, onSubmit, isSending }) {
  return (
    <div className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        />
        <form className="form" name="edit-form" onSubmit={onSubmit}>
          <h2 className="form__heading">{formHeading}</h2>
          <fieldset className="form__set">
            {children}
            <button
              className={`form__save-button ${isSending && "form__save-button_disabled"}`}
              type="submit"
              disabled={isSending}
            >
              {textBtn || "Сохранить"}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
