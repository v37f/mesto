// кнопки и формы
const profileEditButton = document.querySelector('.profile__edit-button');
const placeAddButton = document.querySelector('.profile__add-button')
const popupCloseButtons = document.querySelectorAll('.popup__close');
const profileEditForm = document.querySelector('.form_type_edit-profile');
const placeAddForm = document.querySelector('.form_type_add-place');

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
const cardTemplate = document.querySelector('.element-template');

// массив мест
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

// функция отрисовки карточек мест из массива
const render = () => {
  initialCards.forEach((item) => {
    const currentItem = createPlaceElement(item.name, item.link);
    elementsContainer.append(currentItem);
  });
}

// функция формирования карточки места
const createPlaceElement = (placeTitle, placeImageLink) => {
  const currentItem = cardTemplate.content.cloneNode(true);
  const currentTitle = currentItem.querySelector('.element__title');
  currentTitle.textContent = placeTitle;
  const currentImage = currentItem.querySelector('.element__image');
  currentImage.setAttribute('src', placeImageLink);
  currentImage.setAttribute('alt', placeTitle);
  currentImage.addEventListener('click', () => createImagePopup(placeTitle, placeImageLink));
  currentItem.querySelector('.element__like-button').addEventListener('click', handleLikeButton);
  currentItem.querySelector('.element__delete-button').addEventListener('click', handleDeleteButton);
  return currentItem;
}

// функция лайка карточки
const handleLikeButton = (evt) => {
  evt.target.classList.toggle('element__like-button_active');
}

// функция удаления карточки
const handleDeleteButton = (evt) => {
  const currentEl = evt.target.closest('.element');
  currentEl.remove();
}

// функция "сборки" попапа фотографии
const createImagePopup = (title, link) => {
  popupImageTitle.textContent = title;
  popupImage.setAttribute('src', link);
  popupImage.setAttribute('alt', title);
  openPopup(imagePopup);
}

// функция открытия попапа
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
}

// функция закрытия попапа
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
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
  const place = createPlaceElement(placeTitleInput.value, placeImageLinkInput.value);
  elementsContainer.prepend(place);
  closePopup(placeAddPopup);
}

// функция обработчика кнопки редактирования профиля
const handleProfileEditButton = () => {
  openPopup(profileEditPopup);
}

// функция обработчика кнопки добавления карточки
const handlePlaceAddButton = () => {
  placeAddForm.reset();
  openPopup(placeAddPopup);
}

render();

// слушатели
profileEditButton.addEventListener('click', handleProfileEditButton);
profileEditForm.addEventListener('submit', handleProfileEditFormSubmit);
placeAddButton.addEventListener('click', handlePlaceAddButton);
placeAddForm.addEventListener('submit', handlePlaceAddFormSubmit);
popupCloseButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});


