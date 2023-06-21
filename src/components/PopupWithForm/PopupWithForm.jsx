export default function PopupWithForm( {popupName, formHeading, textBtn, children, isOpen, onClose} ) {
    return (
        <div className={`popup popup_type_${popupName} ${isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <button
                    className="popup__close-button"
                    type="button"
                    aria-label="Закрыть"
                    onClick={onClose}
                />
                <form className="form" name="edit-form" noValidate="">
                    <h2 className="form__heading">{formHeading}</h2>
                    <fieldset className="form__set">
                        {children}
                        <button className="form__save-button" type="submit">
                        {textBtn}
                        </button>
                    </fieldset>
                </form>
            </div>
        </div>
    )
}