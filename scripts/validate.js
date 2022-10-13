// включение валидации вызовом enableValidation
// все настройки передаются при вызове

const enableValidation = (item) => {
  // Вынесем все необходимые элементы формы в константы
  const formElement = document.querySelector(item.formSelector);
  const formInput = formElement.querySelector(item.inputSelector);

  // Выбираем элемент ошибки на основе уникального класса
  const formError = formElement.querySelector(`.${formInput.id}-error`);

  // Функция, которая добавляет класс с ошибкой
  const showInputError = (element) => {
    element.classList.add('form__input_type_error');
    // Показываем сообщение об ошибке
    formError.classList.add('form__input-error_active');
  };

  // Функция, которая удаляет класс с ошибкой
  const hideInputError = (element) => {
    element.classList.remove('form__input_type_error');
    // Скрываем сообщение об ошибке
    formError.classList.remove('form__input-error_active');
  };

  // Функция, которая проверяет валидность поля
  const isValid = () => {
    if (!formInput.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      showInputError(formInput);
    } else {
      // Если проходит, скроем
      hideInputError(formInput);
    }
  };

  // Слушатель события input
  formInput.addEventListener('input', isValid);

}

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: '.form__button_disabled',
  inputErrorClass: '.form__input_type_error',
  errorClass: '.form__error_visible'
});


const NameInput = document.querySelector('.form__input_type_profile-name');
console.log(NameInput.id);
