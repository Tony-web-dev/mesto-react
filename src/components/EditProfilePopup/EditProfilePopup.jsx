import { useContext, useEffect } from "react";
import useForm from "../../utils/useForm";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function EditProfilePopup( {isOpen, onClose, onUpdateUser}) {
    const currentUser = useContext(CurrentUserContext)
    const { values, errors, handleChange, reset, setBeginingValues } = useForm()

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
      onUpdateUser({person: values.person, about: values.about}, reset)
    }

    return (
        <PopupWithForm
          formHeading='Редактировать профиль'
          isOpen={isOpen}
          onClose={resetForClose}
          onSubmit={handleSubmit}
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
              onChange={handleChange}
              required
            />
            <span className="form__message-error">{errors.about}</span>
          </label>
        </PopupWithForm>
    )
}