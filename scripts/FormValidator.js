export default class FormValidator {
  constructor(settings, form) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._form = form;
  }

  _setEventListeners() {
    // создаем массив инпутов формы
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    // получаем элемент кнопки submit для управления ее состоянием
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
    // сделаем кнопу неактивной при изначально пустых полях
    this._toggleButtonState();
    // пройдем по каждому инпуту в массиве
    this._inputList.forEach((input) => {
      this._inputElement = input;
      input.addEventListener('input', () => {
        // и проверим на валидность
        this._isValid();
        // так же изменим состояние кнопки
        this._toggleButtonState();
      });
    });
  }

  _isValid() {
    if (!this.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      this._showInputError();
    } else {
      // Если проходит, скроем
      this._hideInputError();
    }
  }

    // Функция, которая добавляет класс с ошибкой
  _showInputError() {
    // получим переменную элемента ошибки
    this._errorElement = this._form.querySelector(`.${this._inputElement.id}-error`);
    // добавим инпуту стили невалидности
    this._inputElement.classList.add(this._inputErrorClass);
    // Показываем сообщение об ошибке
    this._errorElement.textContent = this._inputElement.validationMessage;
    this._errorElement.classList.add(this._errorClass);
  }

  // Функция, которая удаляет класс с ошибкой
  _hideInputError() {
    // получаем переменную элемента ошибки
    this._errorElement = this._form.querySelector(`.${this._inputElement.id}-error`);
    // убераем у инпута стили невалидности
    this._inputElement.classList.remove(this._inputErrorClass);
    // Скрываем сообщение об ошибке
    this._errorElement.classList.remove(this._errorClass);
    this._errorElement.textContent = '';
  }

  // функция переключения состояний(активна/неактивна) кнопки
  _toggleButtonState() {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput(this._inputList)) {
      // сделаем кнопку неактивной
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    } else {
      // иначе сделаем кнопку активной
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  }

  // функция проверки валидности всех полей формы
  _hasInvalidInput() {
    // проходим по этому массиву методом some
    return this._inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true
      return !inputElement.validity.valid;
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
