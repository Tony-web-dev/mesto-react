import { useRef } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import useForm from "../../utils/useForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isSending }) {
  const input = useRef();
  const { values, errors, handleChange, reset } = useForm();

  function resetForClose() {
    onClose();
    reset();
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({avatar: input.current.value}, reset);
  }

  return (
    <PopupWithForm
      formHeading="Обновить аватар"
      isOpen={isOpen}
      onClose={resetForClose}
      onSubmit={handleSubmit}
      isSending={isSending}
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