// импорты
import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import initialCardsData from '../utils/initialCardsData.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

// кнопки и формы
const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__card-add-button')
const profileEditForm = document.querySelector('.form_type_edit-profile');
const cardAddForm = document.querySelector('.form_type_add-card');

// селекторы
const profileNameSelector = '.profile__name';
const profileJobSelector = '.profile__job';
const cardPopupSelector = '.popup_type_card';
const profileEditPopupSelector = '.popup_type_edit-profile';
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

// Секция карточек
const cardsSection = new Section({
  items: initialCardsData,
  renderer: (cardData) => {
    const cardElement = createCardElement(cardData, cardTemplateSelector, cardPopup.open.bind(cardPopup));
    cardsSection.addItemToEnd(cardElement);
    }
  },
  cardsContainerSelector
);

// текущий пользователь
const currentUser = new UserInfo({ nameSelector: profileNameSelector, jobSelector: profileJobSelector});

//попап с картинкой
const cardPopup = new PopupWithImage(cardPopupSelector);

//попап редактирования профиля
const profileEditPopup = new PopupWithForm(profileEditPopupSelector, handleProfileEditFormSubmit);

//попап добавления карточки
const cardAddPopup = new PopupWithForm(cardAddPopupSelector, handlePlaceAddFormSubmit);

/**
 * Создает DOM-элемент новой карточки
 * @param {object} data объект с данными карточки
 * @param {string} templateSelector селектор шаблона разметки карточки
 * @param {Function} handleCardClick функция обработчика клика по карточке
 * @returns {Element} DOM-элемент карточки с переданными параметрами
 */
function createCardElement(data, templateSelector, handleCardClick) {
  const cardElement = new Card(data, templateSelector, handleCardClick).generateCard();
  return cardElement;
}

/**
 * Изменяет данные профиля на данные введеные пользователем
 * @param {object} inputValues Объект с данными вида: { имя_инпута: значение }
 */
function handleProfileEditFormSubmit(inputValues) {
  currentUser.setUserInfo(inputValues);
  profileEditPopup.close();
}

/**
 * Cоздает новую карточку на основе введенных пользователем данных и доабвляет ее на страницу
 * @param {object} inputValues Объект с данными вида: { имя_инпута: значение }
 */
function handlePlaceAddFormSubmit(inputValues) {
  const newCardElement = createCardElement(inputValues, cardTemplateSelector, cardPopup.open.bind(cardPopup));
  cardsSection.addItemToBegin(newCardElement);
  cardAddPopup.close();
}

/**
 * Открывает всплывающее окно редактирования профиля
 */
const handleProfileEditButtonClick = () => {
  const { userName, userJob} = currentUser.getUserInfo();
  profileNameInput.value = userName;
  profileJobInput.value = userJob;
  profileEditFormValidator.hideInputsValidationErrors();
  profileEditFormValidator.toggleSubmitButtonState();
  profileEditPopup.open();
}

/**
 * Открывает всплывающее окно добавления карточки
 */
const handleCardAddButtonClick = () => {
  placeAddFormValidator.hideInputsValidationErrors();
  placeAddFormValidator.toggleSubmitButtonState();
  cardAddPopup.open();
}

// Отрендерим карточки при первоначальной загрузке страницы
cardsSection.renderItems();

// Включим валидацию формы редактирования профиля
profileEditFormValidator.enableValidation();

// Включим валидацию формы добаления ккарточки
placeAddFormValidator.enableValidation();

// Слушатели
profileEditButton.addEventListener('click', handleProfileEditButtonClick);
cardAddButton.addEventListener('click', handleCardAddButtonClick);
cardPopup.setEventListeners();
profileEditPopup.setEventListeners();
cardAddPopup.setEventListeners();