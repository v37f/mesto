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
const newCardData = {name: null, link: null};
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
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_not-valid',
  errorClass: 'form__input-error_visible'
}

const profileEditFormValidator = new FormValidator(validationSettings, profileEditForm);

// функция отрисовки карточек мест из массива
const render = () => {
  initialCards.forEach((cardData) => {
    const card = new Card(cardData, cardTemplate);
    const cardElement = card.generateCard();
    elementsContainer.append(cardElement);
  });
}

// функция "сборки" попапа фотографии
export const createImagePopup = (title, link) => {
  popupImageTitle.textContent = title;
  popupImage.setAttribute('src', link);
  popupImage.setAttribute('alt', title);
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

// функция отключения кнопки создания карточки
const disablePlaceAddFormSubmitButton = () => {
  placeAddFormSubmitButton.setAttribute('disabled', true);
  placeAddFormSubmitButton.classList.add('form__button_disabled');
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
  newCardData.name = placeTitleInput.value,
  newCardData.link = placeImageLinkInput.value

  const newCard = new Card(newCardData, cardTemplate).generateCard();
  elementsContainer.prepend(newCard);
  closePopup(placeAddPopup);
}

// функция обработчика кнопки редактирования профиля
const handleProfileEditButton = () => {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  hideInputsValidationErrors(profileEditForm);
  openPopup(profileEditPopup);
}

// функция обработчика кнопки добавления карточки
const handlePlaceAddButton = () => {
  placeAddForm.reset();
  hideInputsValidationErrors(placeAddForm);
  disablePlaceAddFormSubmitButton();
  openPopup(placeAddPopup);
}

// функция скрытия ошибок валидации
const hideInputsValidationErrors = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  inputList.forEach((inputElement) => {
    inputElement.classList.remove('form__input_not-valid');
  });
  const errorElementsList = Array.from(formElement.querySelectorAll('.form__input-error'));
  errorElementsList.forEach((errorElement) => {
    errorElement.classList.remove('form__input-error_visible');
    errorElement.textContent = '';
  });
}

render();
profileEditFormValidator.enableValidation();
// слушатели
profileEditButton.addEventListener('click', handleProfileEditButton);
profileEditForm.addEventListener('submit', handleProfileEditFormSubmit);
placeAddButton.addEventListener('click', handlePlaceAddButton);
placeAddForm.addEventListener('submit', handlePlaceAddFormSubmit);


