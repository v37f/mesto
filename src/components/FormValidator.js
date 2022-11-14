/**
 * Класс для создания объектов валидаторов форм
 */
export default class FormValidator {
  /**
   * @constructor
   * @param {object} settings Объект натсроек, содержащих классы и селекторы элементов
   * @param {Element} form DOM-элемент формы
   */
  constructor(settings, form) {
    this._formElement = form;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._inputList = Array.from(form.querySelectorAll(settings.inputSelector));
    this._submitButtonElement = form.querySelector(this._submitButtonSelector);
  }

  /**
   * Устанавливает слушатели на все инпуты формы
   */
  _setEventListeners() {
    // пройдем по каждому инпуту в массиве
    this._inputList.forEach((inputElement) => {
      // для каждого инпута навесим слушатель
      inputElement.addEventListener('input', () => {
        // и проверим на валидность
        this._isValid(inputElement);
        // так же изменим состояние кнопки
        this.toggleSubmitButtonState();
      });
    });
  }

  /**
   * Проверяет валидность инпута
   * @param {Element} inputElement DOM-элемент инпута
   */
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      this._showInputError(inputElement);
    } else {
      // Если проходит, скроем
      this._hideInputError(inputElement);
    }
  }

  /**
   * Показывает ошибки валидации инпута
   * @param {Element} inputElement DOM-элемент инпута
   */
  _showInputError(inputElement) {
    // получим переменную элемента ошибки
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    // добавим инпуту стили невалидности
    inputElement.classList.add(this._inputErrorClass);
    // Показываем сообщение об ошибке
    this._errorElement.textContent = inputElement.validationMessage;
    this._errorElement.classList.add(this._errorClass);
  }

  /**
   * Скрывает ошибки валидации инпута
   * @param {Element} inputElement DOM-элемент инпута
   */
  _hideInputError(inputElement) {
    // получаем переменную элемента ошибки
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    // убераем у инпута стили невалидности
    inputElement.classList.remove(this._inputErrorClass);
    // Скрываем сообщение об ошибке
    this._errorElement.classList.remove(this._errorClass);
    this._errorElement.textContent = '';
  }

  /**
   * Переключает состояние кнопки формы(активна/неактивна)
   */
  toggleSubmitButtonState() {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput()) {
      // сделаем кнопку неактивной
      this._submitButtonElement.classList.add(this._inactiveButtonClass);
      this._submitButtonElement.disabled = true;
    } else {
      // иначе сделаем кнопку активной
      this._submitButtonElement.classList.remove(this._inactiveButtonClass);
      this._submitButtonElement.disabled = false;
    }
  }

  /**
   * Проверяет форму на наличие невалидных инпутов
   * @returns {boolean} Возвращает true если в форме имеется хотя бы один невалидный инпут, в ином случае возращает false
   */
  _hasInvalidInput() {
    // проходим по этому массиву методом some
    return this._inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true
      return !inputElement.validity.valid;
    });
  }

  /**
   * Скрывает ошибки валидации у всех инпутов формы
   */
  hideInputsValidationErrors = () => {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  /**
   * Включает валидацию
   */
  enableValidation() {
    this._setEventListeners();
  }
}
