/**
 * Класс описывающий поведение попапа с картинкой
 */
import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  /**
   * @consctructor
   * @param {string} popupSelector Селектор попапа
   */
  constructor(popupSelector) {
    super(popupSelector);
    this._titleElement = this._popup.querySelector('.popup__image-title');
    this._imageElement = this._popup.querySelector('.popup__image');;
  }

  /**
   * Открывает попап с картинкой
   * @param {string} title Название картинки
   * @param {string} imageLink Cсылка на картинку
   */
  open(title, imageLink) {
    super.open();
    this._titleElement.textContent = title;
    this._imageElement.src = imageLink;
    this._imageElement.alt = title;
  }
}
