/**
 * Класс для взаимодействия с сервером
 */
export default class Api {
   /**
   * @constructor
   * @param {object} options Настройки API
   */
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  /**
   * Получает данные пользователя с сервера
   * @returns {Promise} Ответ от сервера с данными пользователя
   */
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
  }
}
