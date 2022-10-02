const profileEditButton = document.querySelector('.profile__edit-button');
const formPopup = document.querySelector('.popup_type_form');
const popupCloseButtons = document.querySelectorAll('.popup__close');
const formElement = document.querySelector('.form');
const topInput = document.querySelector('.form__input_top');
const bottomInput = document.querySelector('.form__input_bottom');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const addButton = document.querySelector('.profile__add-button')
const photoPopup = document.querySelector('.popup_type_photo');
const elementsContainer = document.querySelector('.elements__container');
const cardTemplate = document.querySelector('.element-template');
let popupCaller = null; // хранит элемент который вызвал попап

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
    const currentItem = createItemNode(item.name, item.link);
    elementsContainer.append(currentItem);
  });
};

// функция формирования dom-узла который хранит карточку места
const createItemNode = (name, link) => {
  const currentItem = cardTemplate.content.cloneNode(true);
  const currentTitle = currentItem.querySelector('.element__title');
  currentTitle.textContent = name;
  const currentImage = currentItem.querySelector('.element__image');
  currentImage.setAttribute('src', link);
  currentImage.addEventListener('click', createPhotoPopup);
  currentItem.querySelector('.element__like-button').addEventListener('click', likeElement);
  currentItem.querySelector('.element__delete-button').addEventListener('click', deleteElement);
  return currentItem;
}

// функция лайка карточки
const likeElement = (evt) => {
  evt.target.classList.toggle('element__like-button_active');
}

// функция удаления карточки
const deleteElement = (evt) => {
  const currentEl = evt.target.closest('.element');
  currentEl.remove();
}

// функция "сборки" попапа фотографии
const createPhotoPopup = (evt) => {
  const popupImage = document.querySelector('.popup__image');
  const popupImageTitle = document.querySelector('.popup__image-title');
  popupImage.setAttribute('src', evt.target.getAttribute('src'));
  popupImageTitle.textContent = evt.target.nextElementSibling.firstElementChild.textContent;
  openPopup(evt.target);
}

// функция открытия попапа
const openPopup = (popupCaller) => {
  if (popupCaller === profileEditButton || popupCaller === addButton) {
    formPopup.classList.add('popup_opened');
  } else {
    photoPopup.classList.add('popup_opened');
  }
}

// функция закрытия попапа
const closePopup = () => {
  formPopup.classList.remove('popup_opened');
  photoPopup.classList.remove('popup_opened');
}

// функции "сборки" формы в зависимости от того, кто вызвал попап
const createFormPopup = (evt) => {
  const formTitle = document.querySelector('.popup__title');
  const formButton = document.querySelector('.form__button');
  if (evt.target.classList.contains('profile__edit-button')) {
    formTitle.textContent = 'Редактировать профиль';
    topInput.value = profileName.textContent;
    bottomInput.value = profileJob.textContent;
    topInput.setAttribute('placeholder', 'Имя');
    bottomInput.setAttribute('placeholder', 'О себе');
    formButton.textContent = 'Сохранить';
  } else {
    formTitle.textContent = 'Новое место';
    topInput.value = '';
    bottomInput.value = '';
    topInput.setAttribute('placeholder', 'Название');
    bottomInput.setAttribute('placeholder', 'Ссылка на картинку');
    formButton.textContent = 'Создать';
  }
  popupCaller = evt.target;
  openPopup(popupCaller);
}

// функция сабмита формы, в зависимости от того кто вызвал попап
const formSubmitHandler = (evt) => {
  evt.preventDefault();
  if (popupCaller.classList.contains('profile__edit-button')) {
  profileName.textContent = topInput.value;
  profileJob.textContent = bottomInput.value;
  } else {
    const card = createItemNode(topInput.value, bottomInput.value);
    elementsContainer.prepend(card);
  }
  closePopup();
}

render();

profileEditButton.addEventListener('click', createFormPopup);
formElement.addEventListener('submit', formSubmitHandler);
addButton.addEventListener('click', createFormPopup);
popupCloseButtons.forEach((button) => {
  button.addEventListener('click', closePopup);
})


