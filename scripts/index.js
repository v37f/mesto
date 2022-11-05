// импорты
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import initialCardsData from './initialCardsData.js';

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
const cardPopupImage = cardPopup.querySelector('.popup__image');
const cardPopupImageTitle = cardPopup.querySelector('.popup__image-title');

// инпуты
const profileNameInput = document.querySelector('.form__input_type_profile-name');
const profileJobInput = document.querySelector('.form__input_type_profile-job');
const cardTitleInput = document.querySelector('.form__input_type_card-title');
const cardImageLinkInput = document.querySelector('.form__input_type_card-image-link');

//контейнеры и темплейты
const cardsContainer = document.querySelector('.cards__container');
const cardTemplateSelector = '.card-template';

// настройки валидации
const validationSettings = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_not-valid',
  errorClass: 'form__input-error_visible'
}

// Валидаторы форм
const profileEditFormValidator = new FormValidator(validationSettings, profileEditForm);
const placeAddFormValidator = new FormValidator(validationSettings, cardAddForm);

// функция создания DOM-элемента карточки
const createCardElement = (data, templateSelector, handleImageClickFunction) => {
  return new Card(data, templateSelector, handleImageClickFunction).generateCard();
}

// функция отрисовки карточек из массива изначальных карточек
const renderInitialCards = () => {
  initialCardsData.forEach((cardData) => {
    const initialCardElement = createCardElement(cardData, cardTemplateSelector, openCardPopup);
    cardsContainer.append(initialCardElement);
  });
}

// функция открытия попапа карточки
const openCardPopup = (card) => {
  // получаем данные карточки через геттеры
  cardPopupImageTitle.textContent = card.title;
  cardPopupImage.src = card.imageLink;
  cardPopupImage.alt = card.title;
  openPopup(cardPopup);
}

// функция открытия попапа
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}

// функция закрыти попапа по клику на оверлей или крестик
const closePopupByClickingOverlayOrCross = (evt) => {
  if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) {
    closePopup(evt.currentTarget);
  };
}

// функция закрытия попапа по нажатию Esc
const closePopupByEsc = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
}

// функция закрытия попапа
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
}

// функция навешевания листенеров на попапы
const setPopupsEventListeners = () => {
  const popupsList = Array.from(document.querySelectorAll('.popup'));
  popupsList.forEach((popup) => {
    popup.addEventListener('click', closePopupByClickingOverlayOrCross);
  });
}

// функция обработчика сабмита формы редактирования профиля
const handleProfileEditFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  closePopup(profileEditPopup);
}

// функция обработчика сабмита формы добавления карточки
const handlePlaceAddFormSubmit = (evt) => {
  evt.preventDefault();
  const newCardData = {
    title: cardTitleInput.value,
    imageLink: cardImageLinkInput.value
  };
  const newCardElement = createCardElement(newCardData, cardTemplateSelector, openCardPopup);
  cardsContainer.prepend(newCardElement);
  closePopup(cardAddPopup);
}

// функция обработчика кнопки редактирования профиля
const handleProfileEditButtonClick = () => {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  profileEditFormValidator.hideInputsValidationErrors();
  profileEditFormValidator.toggleButtonState();
  openPopup(profileEditPopup);
}

// функция обработчика кнопки добавления карточки
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
  // метод toggleButtonState, который проверяет валидность инпутов и в зависмости
  // от этого переключает состояние кнопки. Результат тот же, и кода меньше.
  // Так же это позволяет применить метод toggleButtonState при открытии формы редактирования
  // профиля(handleProfileEditButtonClick), что делает поведение его кнопки сабмит более предсказуемым.
  placeAddFormValidator.toggleButtonState();
  openPopup(cardAddPopup);
}

// навесим листенеры на попапы
setPopupsEventListeners();

// отрендерим карточи при первоначальной загрузке страницы
renderInitialCards();

// включим валидацию формы редактирования профиля
profileEditFormValidator.enableValidation();

// включим валидацию формы добаления ккарточки
placeAddFormValidator.enableValidation();

// слушатели
profileEditButton.addEventListener('click', handleProfileEditButtonClick);
profileEditForm.addEventListener('submit', handleProfileEditFormSubmit);
cardAddButton.addEventListener('click', handlePlaceAddButtonClick);
cardAddForm.addEventListener('submit', handlePlaceAddFormSubmit);


