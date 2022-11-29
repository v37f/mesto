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
   * Записывает данные сущности в попап и открывает его
   * @param {string} itemId уникальный идентификатор сущности
   * @param {Element} itemElement DOM-элемент сущности
   */
   open(itemId, itemElement) {
    super.open();
    this._itemId = itemId;
    this._itemElement = itemElement;
  }

  /**
   * Устанавливает слушатель, для закрытия попапа по нажатию на оверлей или крестик,
   * а так же на сабмит формы
   */
   setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._itemId, this._itemElement);
      this._itemId = null;
      this._itemElement = null;
    });
  }
}
