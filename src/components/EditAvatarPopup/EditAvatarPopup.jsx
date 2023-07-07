import { useRef, useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const input = useRef()
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
    onUpdateAvatar({avatar: input.current.value}, reset)
  }

  return (
    <PopupWithForm
      formHeading="Обновить аватар"
      isOpen={isOpen}
      onClose={resetForClose}
      onSubmit={handleSubmit}
    >
      <label className="form__field">
        <input
          ref={input}
          type="url"
          className="form__input"
          name="avatar"
          placeholder="Ссылка на картинку"
          value={values.avatar ? values.avatar : ''}
          onChange={handleChange}
          required
        />
        <span className="form__message-error">{errors.avatar}</span>
      </label>
    </PopupWithForm>
  );
}