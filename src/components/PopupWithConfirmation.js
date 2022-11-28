/**
 * Класс попапа подтверждения действия
 */
import Popup from "./Popup.js";
export default class PopupWithConfirmation extends Popup {
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
   * Устанавливает слушатель, для закрытия попапа по нажатию на оверлей или крестик,
   * а так же на сабмит формы
   */
   setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  }
}
