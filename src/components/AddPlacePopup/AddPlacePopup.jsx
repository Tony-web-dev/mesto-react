import PopupWithForm from "../PopupWithForm/PopupWithForm";
import useForm from "../../utils/useForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace, isSending }) {
  const { values, errors, handleChange, reset } = useForm();

  function resetForClose() {
    onClose();
    reset();
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ heading: values.heading, url: values.url }, reset);
  }

  return (
    <PopupWithForm
      formHeading="Новое место"
      textBtn="Создать"
      isOpen={isOpen}
      onClose={resetForClose}
      onSubmit={handleSubmit}
      isSending={isSending}
    >
      <label className="form__field">
        <input
          type="text"
          className="form__input"
          name="heading"
          minLength={2}
          maxLength={30}
          placeholder="Название"
          value={values.heading ? values.heading : ""}
          disabled={isSending}
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
          value={values.url ? values.url : ""}
          onChange={handleChange}
          required
        />
        <span className="form__message-error">{errors.url}</span>
      </label>
    </PopupWithForm>
  );
}
