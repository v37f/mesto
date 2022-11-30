/**
 * Класс для создания объектов карточек
 */
export default class Card {
  /**
   * @constructor
   * @param {object} cardData Объект с данными карточки
   * @param {string} templateSelector Селектор шаблона разметки карточки
   * @param {Function} handleCardClick Обработчик клика по картинке
   * @param {Function} handleDeleteButtonClick Обработчик клика по кнопке удаления
   * @param {string} currentUserId уникальный идентификатор текущего пользователя
   * @param {Function} handleLikeButtonClick Обработчик клика по кнопке лайка
   */
  constructor(cardData, templateSelector, handleCardClick, handleDeleteButtonClick, currentUserId, handleLikeButtonClick) {
    this._title = cardData.name;
    this._imageLink = cardData.link;
    this._likes = cardData.likes;
    this._id = cardData._id;
    this._owner = cardData.owner;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteButtonClick = handleDeleteButtonClick;
    this._currentUserId = currentUserId;
    this._handleLikeButtonClick = handleLikeButtonClick;
    this._isLiked = this.isLikedByCurrentUser();
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
   * Функция определяет является ли текущий пользователь автором карточки
   * @returns {boolean} true - если текущий пользователь является автором карточки, false - если нет
   */
  _isOwner() {
    return this._owner._id === this._currentUserId;
  }

  /**
   * Устанавливает слушатели на элементы карточки
   */
  _setEventListeners() {
    this._likeButtonElement.addEventListener('click', () => {
      this._handleLikeButtonClick(this._id, this);
    });

    this._deleteButtonElement.addEventListener('click', () => {
      this._handleDeleteButtonClick(this._id, this._cardElement);
    });

    this._cardElement.addEventListener('click', (evt) => {
      if ( !(evt.target === this._likeButtonElement
          || evt.target === this._deleteButtonElement)) {
        this._handleCardClick(this._title, this._imageLink);
      }
    });
  }

  /**
   * Функция определяет лайкнута ли карточка текущим пользователем
   * @returns {boolean} true - если лайкнута, false - если нет
   */
   isLikedByCurrentUser() {
    return this._likes.some(like => {
      return like._id === this._currentUserId;
    });
  }

  /**
   * Обновляет статус лайка
   * @param {object} updatedCard Объект с обновленными данными карточки
   */
   updateLikeStatus(updatedCard) {
    this._likes = updatedCard.likes;
    this._likeCounterElement.textContent = this._likes.length;
    this._isLiked ? this._likeButtonElement.classList.remove('card__like-button_active')
                  : this._likeButtonElement.classList.add('card__like-button_active');
    this._isLiked = !this._isLiked;
  }

  /**
   * Создает и настраивает DOM-элемент карточки из экземпляра класса Card
   * @returns {Element} DOM-элемент карточки
   */
  generateCard() {
    this._cardElement = this._getTemplate();
    this._likeButtonElement = this._cardElement.querySelector('.card__like-button');
    if (this.isLikedByCurrentUser()) {
      this._likeButtonElement.classList.add('card__like-button_active');
    }
    this._imageElement = this._cardElement.querySelector('.card__image');
    this._deleteButtonElement = this._cardElement.querySelector('.card__delete-button');
    this._titleElement = this._cardElement.querySelector('.card__title');
    this._likeCounterElement = this._cardElement.querySelector('.card__like-counter');

    this._imageElement.src = this._imageLink;
    this._imageElement.alt = this._title;
    this._titleElement.textContent = this._title;
    this._likeCounterElement.textContent = this._likes.length;

    // если карточка создана НЕ текущим пользователем, удалим "корзинку"
    if(!this._isOwner()) {
      this._deleteButtonElement.remove();
    }
    this._setEventListeners();

    return this._cardElement;
  }
}


