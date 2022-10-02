let profileEditButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButtons = document.querySelectorAll('.popup__close');
let formElement = document.querySelector('.form');
let topInput = document.querySelector('.form__input_top');
let bottomInput = document.querySelector('.form__input_bottom');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
const addButton = document.querySelector('.profile__add-button')


const photoPopup = document.querySelector('.popup_type_photo');

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

const elementsContainer = document.querySelector('.elements__container');
const cardTemplate = document.querySelector('.element-template');
let formCaller = null; // хранит элемент который вызвал форму

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
  currentImage.setAttribute('alt', 'Не удалось загрузить картинку!');

  currentItem.querySelector('.element__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active');
  });

  currentItem.querySelector('.element__delete-button').addEventListener('click', function (evt) {
    const currentEl = evt.target.closest('.element');
    currentEl.remove();


  });

  currentImage.addEventListener('click', function () {
    const popupImage = document.querySelector('.popup__image');
    const popupImageTitle = document.querySelector('.popup__image-title');
    popupImage.setAttribute('src', link);
    popupImageTitle.textContent = name;
    photoPopup.classList.add('popup_opened');
  });

  return currentItem;
}

render();

const openPopup = (popupCaller) => {
  if (popupCaller === profileEditButton || popupCaller === addButton) {
    popup.classList.add('popup_opened');
  }
}

const closePopup = () => {
  popup.classList.remove('popup_opened');
  photoPopup.classList.remove('popup_opened');
}


const createForm = (evt) => {
  let formTitle = document.querySelector('.popup__title');
  let formButton = document.querySelector('.form__button');

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
  formCaller = evt.target;
  openPopup(formCaller);
}


const formSubmitHandler = (evt) => {
  evt.preventDefault();
  if (formCaller.classList.contains('profile__edit-button')) {
  profileName.textContent = topInput.value;
  profileJob.textContent = bottomInput.value;
  } else {
    const card = createItemNode(topInput.value, bottomInput.value);
    elementsContainer.prepend(card);
  }
  closePopup();
}

profileEditButton.addEventListener('click', createForm);

formElement.addEventListener('submit', formSubmitHandler);
addButton.addEventListener('click', createForm);

popupCloseButtons.forEach((button) => {
  button.addEventListener('click', closePopup);
})


