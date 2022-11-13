/**
 * Класс для создания объектов карточек
 */
export default class Card {
  /**
   * @constructor
   * @param {object} data Данные карточки
   * @param {string} templateSelector Селектор шаблона разметки карточки
   * @param {Function} handleImageClick Обработчик клика по картинке
   */
  constructor(data, templateSelector, handleImageClick) {
    this._title = data.title;
    this._imageLink = data.imageLink;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
    this.getTitle = function() { return this._title; }
    this.getImageLink = function() { return this._imageLink; }
  }

  /**
   * Функция получения шаблона разметки карточки
   * @returns {Element} DOM-элемент шаблона разметки карточки
   */
  _getTemplate() {
    const cardTemplateElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);

    return cardTemplateElement;
  }

  /**
   * Устанавливает слушатели на элементы карточки
   */
  _setEventListeners() {
    this._likeButtonElement.addEventListener('click', () => {
      this._handleLikeButtonClick();
    });

    this._deleteButtonElement.addEventListener('click', () => {
      this._handleDeleteButtonClick();
    });

    this._imageElement.addEventListener('click', () => {
      // передаем в функцию обработчкиа клика текущий экземпляр
      this._handleImageClick(this);
    });
  }

  /**
   * Изменяет состояние кнопки 'Like'(нажата/не нажата)
   */
  _handleLikeButtonClick() {
    this._likeButtonElement.classList.toggle('card__like-button_active');
  }

  /**
   * Удаляет DOM-элемент карточки из разметки
   */
  _handleDeleteButtonClick() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  /**
   * Создает DOM-элемент карточки из экземпляра класса Card
   * @returns {Element} DOM-элемент карточки
   */
  generateCard() {
    this._cardElement = this._getTemplate();
    this._likeButtonElement = this._cardElement.querySelector('.card__like-button');
    this._imageElement = this._cardElement.querySelector('.card__image');
    this._deleteButtonElement = this._cardElement.querySelector('.card__delete-button');
    this._titleElement = this._cardElement.querySelector('.card__title');

    this._imageElement.src = this._imageLink;
    this._imageElement.alt = this._title;
    this._titleElement.textContent = this._title;

    this._setEventListeners();

    return this._cardElement;
  }
}


