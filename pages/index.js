// импорты
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import initialCardsData from '../utils/initialCardsData.js';

// кнопки и формы
const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__card-add-button')
const profileEditForm = document.querySelector('.form_type_edit-profile');
const cardAddForm = document.querySelector('.form_type_add-card');

// попапы
const profileEditPopup = document.querySelector('.popup_type_edit-profile');
const cardAddPopup = document.querySelector('.popup_type_add-card');
const cardPopup = document.querySelector('.popup_type_card');

// текстовые поля и картинки
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

// инпуты
const profileNameInput = document.querySelector('.form__input_type_profile-name');
const profileJobInput = document.querySelector('.form__input_type_profile-job');
const cardTitleInput = document.querySelector('.form__input_type_card-title');
const cardImageLinkInput = document.querySelector('.form__input_type_card-image-link');

//контейнеры и темплейты
const cardsContainerSelector = '.cards__container';
const cardTemplateSelector = '.card-template';

// настройки валидации
const validationSettings = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button_type_submit',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_not-valid',
  errorClass: 'form__input-error_visible'
}

// Валидаторы форм
const profileEditFormValidator = new FormValidator(validationSettings, profileEditForm);
const placeAddFormValidator = new FormValidator(validationSettings, cardAddForm);

// Отрисовыватель секции карточек
const cardsSection = new Section({
  items: initialCardsData,
  renderer: (cardData) => {
    const cardElement = createCardElement(cardData, cardTemplateSelector, openCardPopup);
    cardsSection.addItemToEnd(cardElement);
    }
  },
  cardsContainerSelector
);

/**
 * Создает DOM-элемент новой карточки
 * @param {object} data объект с данными карточки
 * @param {string} templateSelector селектор шаблона разметки карточки
 * @param {Function} handleImageClick функция обработчика клика по картинке в карточке
 * @returns {Element} DOM-элемент карточки с переданными параметрами
 */
function createCardElement(data, templateSelector, handleImageClick) {
  const cardElement = new Card(data, templateSelector, handleImageClick).generateCard();
  return cardElement;
}

/**
 * Открывает всплывающее окно карточки
 * @param {object} card Экземпляр класса Card, для которого нужно открыть всплывающее окно
 */
const openCardPopup = (card) => {
  // получаем данные карточки через геттеры
  cardPopupImageTitle.textContent = card.getTitle();
  cardPopupImage.src = card.getImageLink();
  cardPopupImage.alt = card.getTitle();
  openPopup(cardPopup);
}

/**
 * Открывает всплывающее окно
 * @param {Element} popup DOM-элемент всплывающего окна, который нужно открыть
 */
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}

/**
 * Закрывает всплывающее окно при клике на оверлей или на крестик
 * @param {object} evt В качестве параметра передается объект события Event
 */
const closePopupByClickingOverlayOrCross = (evt) => {
  if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) {
    closePopup(evt.currentTarget);
  };
}

/**
 * Закрывает всплывающее окно при нажатии на кливишу Escape
 * @param {object} evt В качестве параметра передается объект события Event
 */
const closePopupByEsc = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
}

/**
 * Закрывает всплывающее окно
 * @param {Element} popup DOM-элемент всплывающего окна, который нужно закрыть
 */
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
}

/**
 * Устанавливает слушатели на все всплывающие окна
 */
const setPopupsEventListeners = () => {
  const popupsList = Array.from(document.querySelectorAll('.popup'));
  popupsList.forEach((popup) => {
    popup.addEventListener('click', closePopupByClickingOverlayOrCross);
  });
}

/**
 * Изменяет данные профиля на данные введеные пользователем
 * @param {object} evt В качестве параметра передается объект события Event
 */
const handleProfileEditFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  closePopup(profileEditPopup);
}

/**
 * Cоздает новую карточку на основе введенных пользователем данных и доабвляет ее на страницу
 * @param {object} evt В качестве параметра передается объект события Event
 */
const handlePlaceAddFormSubmit = (evt) => {
  evt.preventDefault();
  const newCardData = {
    title: cardTitleInput.value,
    imageLink: cardImageLinkInput.value
  };
  const newCardElement = createCardElement(newCardData, cardTemplateSelector, openCardPopup);
  cardsSection.addItemToBegin(newCardElement);
  closePopup(cardAddPopup);
}

/**
 * Открывает всплывающее окно редактирования профиля
 */
const handleProfileEditButtonClick = () => {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  profileEditFormValidator.hideInputsValidationErrors();
  profileEditFormValidator.toggleSubmitButtonState();
  openPopup(profileEditPopup);
}

/**
 * Открывает всплывающее окно добавления карточки
 */
const handlePlaceAddButtonClick = () => {
  cardAddForm.reset();
  placeAddFormValidator.hideInputsValidationErrors();

  // В прошлой итерации здесь была функция disablePlaceAddFormSubmitButton,
  // которая просто отключала кнопку сабмита при открытии формы (инпуты пусты,
  // но кнопка активна т.к. событие при котором проверяется валидность инпутов
  // (ввод текста в поле) еще ни разу не происходило)).
  // В ревью было замечение, что эту функцию надо перенести  в класс FormValidator
  // и сделать ее публичной. Я подумал, что вместо того чтобы добалять новый
  // публичный метод в класс, логичнее будет сделать публичным уже существующий
  // метод toggleSubmitButtonState, который проверяет валидность инпутов и в зависмости
  // от этого переключает состояние кнопки. Результат тот же, и кода меньше.
  // Так же это позволяет применить метод toggleSubmitButtonState при открытии формы редактирования
  // профиля(handleProfileEditButtonClick), что делает поведение его кнопки сабмит более предсказуемым.
  placeAddFormValidator.toggleSubmitButtonState();
  openPopup(cardAddPopup);
}

// Установим листенеры на попапы
setPopupsEventListeners();

// Отрендерим карточки при первоначальной загрузке страницы
cardsSection.renderItems();

// Включим валидацию формы редактирования профиля
profileEditFormValidator.enableValidation();

// Включим валидацию формы добаления ккарточки
placeAddFormValidator.enableValidation();

// Слушатели
profileEditButton.addEventListener('click', handleProfileEditButtonClick);
profileEditForm.addEventListener('submit', handleProfileEditFormSubmit);
cardAddButton.addEventListener('click', handlePlaceAddButtonClick);
cardAddForm.addEventListener('submit', handlePlaceAddFormSubmit);


