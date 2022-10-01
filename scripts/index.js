let profileEditButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close');
let formElement = document.querySelector('.form');
let topInput = document.querySelector('.form__input_top');
let bottomInput = document.querySelector('.form__input_bottom');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
const addButton = document.querySelector('.profile__add-button')

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

  return currentItem;
}

render();


const togglePopup = () => {
  popup.classList.toggle('popup_opened');
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
  togglePopup();
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
  togglePopup();
}

profileEditButton.addEventListener('click', createForm);
popupCloseButton.addEventListener('click', togglePopup);
formElement.addEventListener('submit', formSubmitHandler);
addButton.addEventListener('click', createForm);
