export default class Card {
  constructor(data, templateSelector, handleImageClick) {
    this._title = data.name;
    this._imageLink = data.link;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
  }

  // получаем темплейт карточки
  _getTemplate() {
    const cardTemplate = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);

    return cardTemplate;
  }

  // функция навешивания листенером элементам карточки
  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeButtonClick();
    });

    this._cardElement.querySelector('.card__delete-button').addEventListener('click', () => {
      this._handleDeleteButtonClick();
    });

    this._image.addEventListener('click', () => {
      // передаем в функцию обработчкиа клика данные в качестве объекта
      this._handleImageClick(this);
    });
  }

  // функция обработки клика по лайку
  _handleLikeButtonClick() {
    this._likeButton.classList.toggle('card__like-button_active');
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
  get imageLink() {
    return this._imageLink;
  }

  // функция генерации карточки
  generateCard() {
    this._cardElement = this._getTemplate();
    this._likeButton = this._cardElement.querySelector('.card__like-button');
    this._image = this._cardElement.querySelector('.card__image');

    this._image.src = this._imageLink;
    this._image.alt = this._title;
    this._cardElement.querySelector('.card__title').textContent = this._title;

    this._setEventListeners();

    return this._cardElement;
  }
}


