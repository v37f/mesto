/**
 * Класс управляющий отображением информации о пользователе на странице
 */
export default class UserInfo {
  /**
   * @constructor
   * @param {object} Объект с данными пользователя
   * @param {string} nameSelector Селектор элемента имени пользователя
   * @param {string} jobSelector Селектор элемента информации о себе
   * @param {string} avatarSelector Селектор аватара
   */
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  /**
   * Возращает объект с данными пользователя
   * @returns {Object} Объект с полями: userName(string) - имя пользователя, userJob(string) - информация о себе
   */
  getUserInfo() {
    return {
      userName: this._nameElement.textContent,
      userJob: this._jobElement.textContent,
      userId: this._userId
    }
  }

  /**
   * Устанавливает новые данные о пользователе
   * @param {object} Объект с новыми данными пользователя
   * @param {string} userName Имя пользователя
   * @param {string} userJob Информация о себе
   * @param {string} userID уникальный идентификатор пользователя
   * @param {string} avatarLink Ссылка на аватар
   */
  setUserInfo({ userName, userJob, userId, avatarLink }) {
    if (userName) {
      this._nameElement.textContent = userName;
    }
    if (userJob) {
      this._jobElement.textContent = userJob;
    }
    if (userId) {
      this._userId = userId;
    }
    if (avatarLink) {
      this._avatarElement.src = avatarLink;
    }
  }
}
