import { useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";


export default function AddPlacePopup({isOpen, onClose, onAddPlace}) {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        const errorMessage = e.target.validationMessage;
    
        setValues((outdatedValues) => {
          return {...outdatedValues, [name]: value}
        })
    
        setErrors((outdatedErrors) => {
          return {...outdatedErrors, [name]:  errorMessage}
        })
    }
    
    function reset(data = {}) {
        setValues(data);
        setErrors({});
    }

    function resetForClose() {
        onClose();
        reset()
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({heading: values.heading, url: values.url}, reset)
    }

    return (
      <PopupWithForm
        formHeading="Новое место"
        textBtn="Создать"
        isOpen={isOpen}
        onClose={resetForClose}
        onSubmit={handleSubmit}
      >
        <label className="form__field">
          <input
            type="text"
            className="form__input"
            name="heading"
            minLength={2}
            maxLength={30}
            placeholder="Название"
            value={values.heading ? values.heading : ''}
            onChange={handleChange}
            required
          />
          <span className="form__message-error">{errors.heading}</span>
        </label>
        <label className="form__field">
          <input
            type="url"
            className="form__input"
            name="url"
            placeholder="Ссылка на картинку"
            value={values.url ? values.url : ''}
            onChange={handleChange}
            required
          />
          <span className="form__message-error">{errors.url}</span>
        </label>
      </PopupWithForm>
    )
}