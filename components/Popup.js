/**
 * Класс отвечающий за открытие и закрытие попапа
 */
export default class Popup {
  /**
   * @constructor
   * @param {string} popupSelector Селектор попапа
   */
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  /**
   * Закрывает попап при нажатии на кливишу Escape
   * @param {object} evt В качестве параметра передается объект события Event
   */
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this._popup.close();
    };
  }

  /**
   * Закрывает попап при клике на оверлей или на крестик
   * @param {object} evt В качестве параметра передается объект события Event
   */
  _handleOverlayOrCrossClick(evt) {
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) {
      this._popup.close();
    };
  }

  /**
   * Открывает попап
   */
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  /**
   * Закрывает попап
   */
 close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  /**
   * Устанавливает слушатель, для закрытия попапа по нажатию на оверлей или крестик
   */
  setEventListeners() {
    this._popup.addEventListener('click', this._handleOverlayOrCrossClick);
  }
}
