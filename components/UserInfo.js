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
   * @returns {Object} Объект с полями: name(string) - имя пользователя, job(string) - информация о себе
   */
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent
    }
  }

  /**
   * Устанавливает новые данные о пользователе
   * @param {object} Объект с новыми данными пользователя
   * @param {string} name Имя пользователя
   * @param {string} job Информация о себе
   */
  setUserInfo({ name, job }) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
  }
}
