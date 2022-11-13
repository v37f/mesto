/**
 * Класс управляющий отображением информации о пользователе на странице
 */
export default class UserInfo {
  /**
   * @constructor
   * @param {object} Объект с данными пользователя
   * @param {string} nameSelector Селектор элемента имени пользователя
   * @param {string} jobSelector Селектор элемента информации о себе
   */
  constructor({ nameSelector, jobSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
  }

  /**
   * Возращает объект с данными пользователя
   * @returns {Object} Объект с полями: userName(string) - имя пользователя, userJob(string) - информация о себе
   */
  getUserInfo() {
    return {
      userName: this._nameElement.textContent,
      userJob: this._jobElement.textContent
    }
  }

  /**
   * Устанавливает новые данные о пользователе
   * @param {object} Объект с новыми данными пользователя
   * @param {string} userName Имя пользователя
   * @param {string} userJob Информация о себе
   */
  setUserInfo({ userName, userJob }) {
    this._nameElement.textContent = userName;
    this._jobElement.textContent = userJob;
  }
}
