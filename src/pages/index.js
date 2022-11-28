// импорты
import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import initialCardsData from '../utils/initialCardsData.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation';
import Api from '../components/Api';

// интерактивные элементы
const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__card-add-button')
const profileEditForm = document.querySelector('.form_type_edit-profile');
const cardAddForm = document.querySelector('.form_type_add-card');
const updateAvatarForm = document.querySelector('.form_type_update-avatar');
const profileAvatar = document.querySelector('.profile__avatar');

// селекторы
const profileNameSelector = '.profile__name';
const profileJobSelector = '.profile__job';
const profileAvatarSelector = '.profile__avatar-image';
const cardPopupSelector = '.popup_type_card';
const profileEditPopupSelector = '.popup_type_edit-profile';
const updateAvatarPopupSelector = '.popup_type_update-avatar'
const deleteCardPopupSelector = '.popup_type_confirm';
const cardAddPopupSelector = '.popup_type_add-card';
const cardsContainerSelector = '.cards__container';
const cardTemplateSelector = '.card-template';

// инпуты
const profileNameInput = document.querySelector('.form__input_type_profile-name');
const profileJobInput = document.querySelector('.form__input_type_profile-job');

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
const updateAvatarFormValidator = new FormValidator(validationSettings, updateAvatarForm);

// API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-55',
  headers: {
    authorization: '40a136fa-5c6f-4ba8-be9b-7c5623c5024c',
    'Content-Type': 'application/json'
  }
});

let cardsSection = null;
// получим массив карточек с сервера
api.getInitialCards()
  .then(initialCards => {
    // создадим секцию карточек
    cardsSection = new Section({
      items: initialCards,
      renderer: (cardData) => {
        const cardElement = createCardElement(cardData, cardTemplateSelector, cardPopup.open.bind(cardPopup), handleDeleteButtonClick);
        cardsSection.addItemToEnd(cardElement);
      }
    },
      cardsContainerSelector
    );
    return cardsSection;
  })
  .then(section => {
    // Отрендерим карточки
    section.renderItems();
  })
  .catch((error) => {
    console.log('Не удалось получить данные карточек от сервера');
    console.log(error);
  });

// текущий пользователь
const currentUser = new UserInfo({
  nameSelector: profileNameSelector,
  jobSelector: profileJobSelector,
  avatarSelector: profileAvatarSelector
});

//попап с картинкой
const cardPopup = new PopupWithImage(cardPopupSelector);

//попап редактирования профиля
const profileEditPopup = new PopupWithForm(profileEditPopupSelector, handleProfileEditFormSubmit);

// попап обновления аватара
const updateAvatarPopup = new PopupWithForm(updateAvatarPopupSelector, handleUpdateAvatarFormSubmit);

//попап добавления карточки
const cardAddPopup = new PopupWithForm(cardAddPopupSelector, handleCardAddFormSubmit);

// попап подтверждения удаления карточки
// const deleteCardPopup = new PopupWithConfirmation(deleteCardPopupSelector, handleDeleteCardFormSubmit);

/**
 * Создает DOM-элемент новой карточки
 * @param {object} data объект с данными карточки
 * @param {string} templateSelector селектор шаблона разметки карточки
 * @param {Function} handleCardClick функция обработчика клика по карточке
 * @returns {Element} DOM-элемент карточки с переданными параметрами
 */
function createCardElement(data, templateSelector, handleCardClick, handleDeleteButtonClick) {
  const cardElement = new Card(data, templateSelector, handleCardClick, handleDeleteButtonClick).generateCard();
  return cardElement;
}

/**
 * Изменяет данные профиля на данные введеные пользователем
 * @param {object} inputValues Объект с данными вида: { имя_инпута: значение }
 */
function handleProfileEditFormSubmit(inputValues) {
  api.updateUserInfo({
    name: inputValues.userName,
    about: inputValues.userJob
  })
  .then((userInfo) => {
    currentUser.setUserInfo({
      userName: userInfo.name,
      userJob: userInfo.about,
      avatarLink: userInfo.avatar
    });
  })
  .catch((error) => {
    console.log('Не удалось обновить данные пользователя');
    console.log(error);
  })
  .finally(() => {
    profileEditPopup.close();
  });
}

const deleteCardPopup = new PopupWithConfirmation(deleteCardPopupSelector, handleDeleteCardFormSubmit);
deleteCardPopup.setEventListeners();
function handleDeleteButtonClick(card) {

  deleteCardPopup.setCard(card);

  deleteCardPopup.open();
}

/**
 * Удаляет карточку с сервера
 */
function handleDeleteCardFormSubmit(card) {

  api.deleteCard(card._id)
  .then(() => {
    console.log(card);
    card._cardElement.remove();
    card._cardElement = null;
  })
  .catch((error) => {
  console.log('Не удалось удалить карточку');
  console.log(error);
  })
  .finally(() => {
    deleteCardPopup.close();
  });
}


/**
 * Изменяет изменяет аватар профиля на данные введеные пользователем
 * @param {object} inputValue Объект с данными вида: { имя_инпута: значение }
 */
function handleUpdateAvatarFormSubmit(inputValue) {

}

/**
 * Cоздает новую карточку на основе введенных пользователем данных,
 * загружает её на сервер и добавляет ее на страницу
 * @param {object} inputValues Объект с данными вида: { имя_инпута: значение }
 */
function handleCardAddFormSubmit(inputValues) {
  api.addCard({
    name: inputValues.cardTitle,
    link: inputValues.imageLink
   })
   .then((cardData) => {
    const newCardElement = createCardElement(cardData, cardTemplateSelector, cardPopup.open.bind(cardPopup), handleDeleteButtonClick);
    cardsSection.addItemToBegin(newCardElement);
   })
   .catch((error) => {
    console.log('Не удалось добавить карточку');
    console.log(error);
  })
  .finally(() => {
    cardAddPopup.close();
  });
}

/**
 * Открывает всплывающее окно редактирования профиля
 */
const handleProfileEditButtonClick = () => {
  const { userName, userJob } = currentUser.getUserInfo();
  profileNameInput.value = userName;
  profileJobInput.value = userJob;
  profileEditFormValidator.hideInputsValidationErrors();
  profileEditFormValidator.toggleSubmitButtonState();
  profileEditPopup.open();
}

/**
 * Открывает всплывающее окно обновления аватара
 */
const handleProfileAvatarClick = () => {
  updateAvatarFormValidator.hideInputsValidationErrors();
  updateAvatarFormValidator.toggleSubmitButtonState();
  updateAvatarPopup.open();
}

/**
 * Открывает всплывающее окно добавления карточки
 */
const handleCardAddButtonClick = () => {
  placeAddFormValidator.hideInputsValidationErrors();
  placeAddFormValidator.toggleSubmitButtonState();
  cardAddPopup.open();
}

// Получаем данные о пользователе с сервера и подставляем их в разметку
api.getUserInfo()
  .then(userInfo => {
    currentUser.setUserInfo({
      userName: userInfo.name,
      userJob: userInfo.about,
      avatarLink: userInfo.avatar
    });
  })
  .catch((error) => {
    console.log('Не удалось получить данные пользователя от сервера');
    console.log(error);
  });



// Включим валидацию формы редактирования профиля
profileEditFormValidator.enableValidation();

// Включим валидацию формы добаления ккарточки
placeAddFormValidator.enableValidation();

// Включим валидацию формы обновления аватара
updateAvatarFormValidator.enableValidation();

// Слушатели
profileEditButton.addEventListener('click', handleProfileEditButtonClick);
profileAvatar.addEventListener('click', handleProfileAvatarClick);
cardAddButton.addEventListener('click', handleCardAddButtonClick);
cardPopup.setEventListeners();
profileEditPopup.setEventListeners();
cardAddPopup.setEventListeners();
updateAvatarPopup.setEventListeners();

