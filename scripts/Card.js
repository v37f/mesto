export default class Card {
  constructor(data, templateSelector, handleImageClick) {
    this._title = data.name;
    this._image = data.link;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
  }

  // получаем темплейт карточки
  _getTemplate() {
    const cardTemplate = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardTemplate;
  }

  // функция навешивания листенером элементам карточки
  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeButtonClick();
    });

    this._cardElement.querySelector('.element__delete-button').addEventListener('click', () => {
      this._handleDeleteButtonClick();
    });

    this._cardElement.querySelector('.element__image').addEventListener('click', () => {
      // передаем в функцию обработчкиа клика данные в качестве объекта
      this._handleImageClick(this);
    });
  }

  // функция обработки клика по лайку
  _handleLikeButtonClick() {
    this._likeButton.classList.toggle('element__like-button_active');
  }

  // функция обработки клика по кнопке удаления
  _handleDeleteButtonClick() {
    this._cardElement.remove();
    this._cardElement = null;
  }


  // геттер для названия карточки
  get title() {
    return this._title;
  }

  // геттер для картинки
  get image() {
    return this._image;
  }

  // функция генерации карточки
  generateCard() {
    this._cardElement = this._getTemplate();
    this._likeButton = this._cardElement.querySelector('.element__like-button');

    this._setEventListeners();

    this._cardElement.querySelector('.element__title').textContent = this._title;
    this._cardElement.querySelector('.element__image').src = this._image;
    this._cardElement.querySelector('.element__image').alt = this._title;

    return this._cardElement;
  }
}


