import { useContext, useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import useForm from "../../utils/useForm";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser, isSending }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, setBeginingValues, errors, handleChange, reset } = useForm();

  useEffect(() => {
    setBeginingValues("person", currentUser.name)
    setBeginingValues("about", currentUser.about)
  }, [currentUser, setBeginingValues])

  function resetForClose() {
    onClose();
    reset({person: currentUser.name, about: currentUser.about})
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({person: values.person, about: values.about}, reset);
  }

  return (
    <PopupWithForm
      formHeading="Редактировать профиль"
      isOpen={isOpen}
      onClose={resetForClose}
      onSubmit={handleSubmit}
      isSending={isSending}
    >
      <label className="form__field">
        <input
          type="text"
          className="form__input"
          name="person"
          minLength={2}
          maxLength={40}
          placeholder="Ваше имя"
          value={values.person ? values.person : ''}
          disabled={isSending}
          onChange={handleChange}
          required
        />
        <span className="form__message-error">{errors.person}</span>
      </label>
      <label className="form__field">
        <input
          type="text"
          className="form__input"
          name="about"
          minLength={2}
          maxLength={200}
          placeholder="Ваше призвание"
          value={values.about ? values.about : ''}
          disabled={isSending}
          onChange={handleChange}
          required
        />
        <span className="form__message-error">{errors.about}</span>
      </label>
    </PopupWithForm>
  );
}