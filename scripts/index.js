// импорты
import Card from './Card.js';
import FormValidator from './FormValidator.js';

// кнопки и формы
const profileEditButton = document.querySelector('.profile__edit-button');
const placeAddButton = document.querySelector('.profile__add-button')
const profileEditForm = document.querySelector('.form_type_edit-profile');
const placeAddForm = document.querySelector('.form_type_add-place');
const placeAddFormSubmitButton = placeAddForm.querySelector('.form__button');

// попапы
const profileEditPopup = document.querySelector('.popup_type_edit-profile');
const placeAddPopup = document.querySelector('.popup_type_add-place');
const imagePopup = document.querySelector('.popup_type_image');

// текстовые поля и картинки
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const popupImage = imagePopup.querySelector('.popup__image');
const popupImageTitle = imagePopup.querySelector('.popup__image-title');

// инпуты
const profileNameInput = document.querySelector('.form__input_type_profile-name');
profileNameInput.value = profileName.textContent;
const profileJobInput = document.querySelector('.form__input_type_profile-job');
profileJobInput.value = profileJob.textContent;
const placeTitleInput = document.querySelector('.form__input_type_place-title');
const placeImageLinkInput = document.querySelector('.form__input_type_place-image-link');

//контейнеры и темплейты
const elementsContainer = document.querySelector('.elements__container');
const cardTemplate = '.element-template';

// данные
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

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
const placeAddFormValidator = new FormValidator(validationSettings, placeAddForm);

// функция отрисовки карточек мест из массива
const render = () => {
  initialCards.forEach((cardData) => {
    const card = new Card(cardData, cardTemplate, openImagePopup);
    const cardElement = card.generateCard();
    elementsContainer.append(cardElement);
  });
}

// функция открытия попапа карточки
const openImagePopup = (card) => {
  // получаем данные карточки через геттеры
  popupImageTitle.textContent = card.title;
  popupImage.src = card.imageLink;
  popupImage.alt = card.title;
  openPopup(imagePopup);
}

// функция открытия попапа
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', closePopupByClickingOverlayOrCross);
  document.addEventListener('keydown', closePopupByEsc);
}

// функция закрыти попапа по клику на оверлей или крестик
const closePopupByClickingOverlayOrCross = (evt) => {
  if (evt.target == evt.currentTarget || evt.target.classList.contains('popup__close')) {
    closePopup(evt.currentTarget);
  };
}

// функция закрытия попапа по нажатию Esc
const closePopupByEsc = (evt) => {
  if (evt.key == 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
}

// функция закрытия попапа
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', closePopupByClickingOverlayOrCross);
  document.removeEventListener('keydown', closePopupByEsc);
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
    name: placeTitleInput.value,
    link: placeImageLinkInput.value
  };
  const newCard = new Card(newCardData, cardTemplate, openImagePopup).generateCard();
  elementsContainer.prepend(newCard);
  closePopup(placeAddPopup);
}

// функция обработчика кнопки редактирования профиля
const handleProfileEditButton = () => {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  profileEditFormValidator.hideInputsValidationErrors();
  profileEditFormValidator.toggleButtonState();
  openPopup(profileEditPopup);
}

// функция обработчика кнопки добавления карточки
const handlePlaceAddButton = () => {
  placeAddForm.reset();
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
  // профиля(handleProfileEditButton), что делает поведение его кнопки сабмит более предсказуемым.
  placeAddFormValidator.toggleButtonState();
  openPopup(placeAddPopup);
}

// отрендерим карточи при первоначальной загрузке страницы
render();

// включим валидацию формы редактирования профиля
profileEditFormValidator.enableValidation();

// включим валидацию формы добаления ккарточки
placeAddFormValidator.enableValidation();

// слушатели
profileEditButton.addEventListener('click', handleProfileEditButton);
profileEditForm.addEventListener('submit', handleProfileEditFormSubmit);
placeAddButton.addEventListener('click', handlePlaceAddButton);
placeAddForm.addEventListener('submit', handlePlaceAddFormSubmit);


