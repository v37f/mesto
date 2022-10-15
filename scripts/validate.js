// функция включения валидация, принимает навход объект с настройками
const enableValidation = (validationSettings) => {
  // находим все формы на странице
  const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
  // перебераем массив форм
  formList.forEach((formElement) => {
    // для каждой формы вызываем навешивания листенеров
    setEventListeners(formElement, validationSettings);
  });
}

// функция навешивания листенеров на все инпуты формы
function setEventListeners(formElement, validationSettings) {
  // создаем массив инпутов формы
  const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
  // получаем элемент кнопки submit для управления ее состоянием
  const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);
  // сделаем кнопу неактивной при изначально пустых полях
  toggleButtonState(inputList, buttonElement, validationSettings);
  // пройдем по каждому инпуту в массиве
  inputList.forEach((inputElement) => {
    // для каждого инпута навесим слушатель
    inputElement.addEventListener('input', () => {
      // и проверим на валидность
      isValid(formElement, inputElement, validationSettings);
      // так же изменим состояние кнопки
      toggleButtonState(inputList, buttonElement, validationSettings);
    });
  });
}

// Функция проверки валидность поля
function isValid(formElement, inputElement, validationSettings) {
if (!inputElement.validity.valid) {
  // Если поле не проходит валидацию, покажем ошибку
  showInputError(formElement, inputElement, inputElement.validationMessage, validationSettings);
} else {
  // Если проходит, скроем
  hideInputError(formElement, inputElement, validationSettings);
}
}

// Функция, которая добавляет класс с ошибкой
function showInputError(formElement, inputElement, errorMessage, validationSettings) {
  // получим переменную элемента ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // добавим инпуту стили невалидности
  inputElement.classList.add(validationSettings.inputErrorClass);
  // Показываем сообщение об ошибке
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationSettings.errorClass);
}

// Функция, которая удаляет класс с ошибкой
function hideInputError(formElement, inputElement, validationSettings) {
  // получаем переменную элемента ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // убераем у инпута стили невалидности
  inputElement.classList.remove(validationSettings.inputErrorClass);
  // Скрываем сообщение об ошибке
  errorElement.classList.remove(validationSettings.errorClass);
  errorElement.textContent = '';
}

// функция проверки валидности всех полей формы
function hasInvalidInput(inputList) {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  });
}

// функция переключения состояний(активна/неактивна) кнопки
function toggleButtonState(inputList, buttonElement, validationSettings) {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделаем кнопку неактивной
    buttonElement.classList.add(validationSettings.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    // иначе сделаем кнопку активной
    buttonElement.classList.remove(validationSettings.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}

// вызываем функции включения валидации с нужными настройками
enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_not-valid',
  errorClass: 'form__input-error_visible'
});

