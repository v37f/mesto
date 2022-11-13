/**
 * Класс попапа с формой
 */
import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  /**
   * @constructor
   * @param {string} popupSelector Селектор попапа
   * @param {Function} handleFormSubmit Обработчик нажатия кнопки сабмит
   */
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popup.querySelector('.form');
  }

  /**
   * Собирает данные всех инутов формы
   * @returns {object} Объект с данными вида: { имя_инпута: значение }
   */
  _getInputValues() {
    this._inputList = this._formElement.querySelectorAll('.form__input');

    this._inputValues = {};
    this._inputList.forEach(input => this._inputValues[input.name] = input.value);

    return this._inputValues;
  }

  /**
   * Устанавливает слушатель, для закрытия попапа по нажатию на оверлей или крестик,
   * а так же на сабмит формы
   */
  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', this._handleFormSubmit);
  }

  /**
   * Закрывает попап и сбрасывает форму
   */
  close() {
    super.close();
    this._formElement.reset();
  }
}
