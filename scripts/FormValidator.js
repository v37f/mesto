export default class FormValidator {
  constructor(settings, form) {
    this._form = form;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._inputList = Array.from(form.querySelectorAll(settings.inputSelector));
    this._buttonElement = form.querySelector(this._submitButtonSelector);
  }

  // функция установки листенеров на инпуты
  _setEventListeners() {
    // сделаем кнопку неактивной при изначально пустых полях
    this._toggleButtonState();
    // пройдем по каждому инпуту в массиве
    this._inputList.forEach((input) => {
      // для каждого инпута навесим слушатель
      input.addEventListener('input', () => {
        // и проверим на валидность
        this._isValid(input);
        // так же изменим состояние кнопки
        this._toggleButtonState();
      });
    });
  }

  // Функция проверки валидность поля
  _isValid(input) {
    if (!input.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      this._showInputError(input);
    } else {
      // Если проходит, скроем
      this._hideInputError(input);
    }
  }

    // Функция, которая добавляет класс с ошибкой
  _showInputError(input) {
    // получим переменную элемента ошибки
    this._errorElement = this._form.querySelector(`.${input.id}-error`);
    // добавим инпуту стили невалидности
    input.classList.add(this._inputErrorClass);
    // Показываем сообщение об ошибке
    this._errorElement.textContent = input.validationMessage;
    this._errorElement.classList.add(this._errorClass);
  }

  // Функция, которая удаляет класс с ошибкой
  _hideInputError(input) {
    // получаем переменную элемента ошибки
    this._errorElement = this._form.querySelector(`.${input.id}-error`);
    // убераем у инпута стили невалидности
    input.classList.remove(this._inputErrorClass);
    // Скрываем сообщение об ошибке
    this._errorElement.classList.remove(this._errorClass);
    this._errorElement.textContent = '';
  }

  // функция переключения состояний(активна/неактивна) кнопки
  _toggleButtonState() {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput()) {
      // сделаем кнопку неактивной
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      // иначе сделаем кнопку активной
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  // функция проверки валидности всех полей формы
  _hasInvalidInput() {
    // проходим по этому массиву методом some
    return this._inputList.some((_inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true
      return !_inputElement.validity.valid;
    });
  }

  // функция включения валидации
  enableValidation() {
    this._setEventListeners();
  }
}
