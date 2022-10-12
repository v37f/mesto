// включение валидации вызовом enableValidation
// все настройки передаются при вызове

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: '.form__button_disabled',
  inputErrorClass: '.form__input_type_error',
  errorClass: '.form__error_visible'
});
