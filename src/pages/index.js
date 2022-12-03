// импорты
import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation';
import Api from '../components/Api';

// интерактивные элементы
const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__card-add-button');
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
const updateAvatarPopupSelector = '.popup_type_update-avatar';
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

// создаем переменную секции карточек в глобальной области видимости
let cardsSection = null;

// текущий пользователь
const currentUser = new UserInfo({
  nameSelector: profileNameSelector,
  jobSelector: profileJobSelector,
  avatarSelector: profileAvatarSelector
});

// попап с картинкой
const cardPopup = new PopupWithImage(cardPopupSelector);

// попап редактирования профиля
const profileEditPopup = new PopupWithForm(profileEditPopupSelector, handleProfileEditFormSubmit);

// попап обновления аватара
const updateAvatarPopup = new PopupWithForm(updateAvatarPopupSelector, handleUpdateAvatarFormSubmit);

// попап добавления карточки
const cardAddPopup = new PopupWithForm(cardAddPopupSelector, handleCardAddFormSubmit);

// попап подтверждения удаления карточки
const deleteCardPopup = new PopupWithConfirmation(deleteCardPopupSelector, handleDeleteCardFormSubmit);

/**
 * Отрисовывает карточку на странице
 * @param {object} cardData Объект с данными карточки
 */
function renderCard(cardData) {
  const cardElement = new Card(
    cardData,
    cardTemplateSelector,
    cardPopup.open.bind(cardPopup),
    deleteCardPopup.open.bind(deleteCardPopup),
    currentUser.getUserInfo().userId,
    handleLikeButtonClick
  ).generateCard();
  cardsSection.addItem(cardElement);
}

/**
 * Изменяет данные профиля на данные введеные пользователем
 * @param {object} inputValues Объект с данными вида: { имя_инпута: значение }
 */
function handleProfileEditFormSubmit(inputValues) {
  return api.updateUserInfo({
    name: inputValues.userName,
    about: inputValues.userJob
  })
    .then((userInfo) => {
      currentUser.setUserInfo({
        userName: userInfo.name,
        userJob: userInfo.about
      });
      profileEditPopup.close();
    })
    .catch((error) => {
      console.log('Не удалось обновить данные пользователя');
      console.log(error);
    })
}

/**
 * Удаляет карточку с сервера и после этого из разметки
 * @param {string} cardId уникальный идентификатор карточки
 * @param {Element} cardElement DOM-элемент карточки
 */
function handleDeleteCardFormSubmit(cardId, cardElement) {
  api.deleteCard(cardId)
    .then(() => {
      cardElement.remove();
      cardElement = null;
      deleteCardPopup.close();
    })
    .catch((error) => {
      console.log('Не удалось удалить карточку');
      console.log(error);
    })
}

/**
 * Изменяет аватар профиля на данные введеные пользователем
 * @param {object} inputValue Объект с данными вида: { имя_инпута: значение }
 */
function handleUpdateAvatarFormSubmit(inputValue) {
  return api.updateAvatar(inputValue.avatar)
    .then(() => {
      currentUser.setUserInfo({
        avatarLink: inputValue.avatar
      });
      updateAvatarPopup.close();
    })
    .catch((error) => {
      console.log('Не удалось обновить аватар');
      console.log(error);
    })
}

/**
 * Cоздает новую карточку на основе введенных пользователем данных,
 * загружает её на сервер и добавляет ее на страницу
 * @param {object} inputValues Объект с данными вида: { имя_инпута: значение }
 */
function handleCardAddFormSubmit(inputValues) {
  return api.addCard({
    name: inputValues.cardTitle,
    link: inputValues.imageLink
  })
    .then((cardData) => {
      renderCard(cardData);
      cardAddPopup.close();
    })
    .catch((error) => {
      console.log('Не удалось добавить карточку');
      console.log(error);
    })
}

/**
 * Открывает всплывающее окно редактирования профиля
 */
function handleProfileEditButtonClick() {
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
function handleProfileAvatarClick() {
  updateAvatarFormValidator.hideInputsValidationErrors();
  updateAvatarFormValidator.toggleSubmitButtonState();
  updateAvatarPopup.open();
}

/**
 * Открывает всплывающее окно добавления карточки
 */
function handleCardAddButtonClick() {
  placeAddFormValidator.hideInputsValidationErrors();
  placeAddFormValidator.toggleSubmitButtonState();
  cardAddPopup.open();
}

/**
 * Ставить карточке лайк если его нет, убирает лайк если он есть
 * @param {string} cardId уникальный идентификатор карточки
 * @param {object} card Объект карточки
 */
function handleLikeButtonClick(cardId, card) {
  if (card.isLikedByCurrentUser()) {
    api.removeLike(cardId)
      .then(updatedCard => {
        card.updateLikeStatus(updatedCard);
      })
      .catch((error) => {
        console.log('Не удалось убрать лайк');
        console.log(error);
      })
  } else {
    api.setLike(cardId)
      .then(updatedCard => {
        card.updateLikeStatus(updatedCard);
      })
      .catch((error) => {
        console.log('Не удалось поставить лайк');
        console.log(error);
      })
  }
}

// Получаем данные о пользователе с сервера и подставляем их в разметку
api.getUserInfo()
  .then(userInfo => {
    currentUser.setUserInfo({
      userName: userInfo.name,
      userJob: userInfo.about,
      userId: userInfo._id,
      avatarLink: userInfo.avatar
    });
  })
  .then(() => {
    // получим массив карточек с сервера
    api.getInitialCards()
      .then(initialCards => {
        // создадим секцию карточек
        cardsSection = new Section({
          items: initialCards,
          renderer: renderCard
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
deleteCardPopup.setEventListeners();
