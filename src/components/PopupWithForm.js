/**
 * Класс попапа с формой
 */
import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  /**
   * @constructor
   * @param {string} popupSelector Селектор попапа
   * @param {Function} handleFormSubmit Обработчик нажатия кнопки сабмит
   */
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popup.querySelector('.form');
    this._submitButtonElement = this._formElement.querySelector('.form__button_type_submit');
    this._submitButtonText = this._submitButtonElement.textContent;
  }

  /**
   * Собирает данные всех инутов формы
   * @returns {object} Объект с данными вида: { имя_инпута: значение }
   */
  _getInputValues() {
    this._inputList = this._formElement.querySelectorAll('.form__input');

    this._inputValues = {};
    this._inputList.forEach(input => this._inputValues[input.name] = input.value);

    return this._inputValues;
  }

  /**
   * Изменяет надпись на кнопке во вермя загрузки данных
   * @param {boolean} isLoading true - когда идет обмен данными с сервером
   */
  _renderLoading(isLoading) {
    if (isLoading) {
      switch(this._submitButtonText) {
        case 'Создать':
          this._submitButtonElement.textContent = 'Создание...';
          break;
        default:
          this._submitButtonElement.textContent = 'Сохранение...';
          break;
      }
    } else {
      this._submitButtonElement.textContent = this._submitButtonText
    }
  }

  /**
   * Устанавливает слушатель, для закрытия попапа по нажатию на оверлей или крестик,
   * а так же на сабмит формы
   */
  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._renderLoading(true);
      this._handleFormSubmit(this._getInputValues())
        .finally(() => {
          this._renderLoading(false);
        });
    });
  }

  /**
   * Закрывает попап и сбрасывает форму
   */
  close() {
    super.close();
    this._formElement.reset();
  }
}
