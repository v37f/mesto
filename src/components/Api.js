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
   * Проверяет ответ сервера на запрос (успешен/неуспешен)
   * @param {Response} response Ответ сервера на запрос
   * @returns {Promise} Если ответ с сервера успешен возвращает
   * промис с данными. Если ответ неуспешен возвращает отклоненный
   * промис с номером ошибки
   */
  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
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
      return this._checkResponse(res);
    })
  }

  /**
   * Получает карточки с сервера
   * @returns {Promise} Ответ от сервера с массивом карточек
   */
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then(res => {
      return this._checkResponse(res);
    })
  }

  /**
   * Обновляет на сервере данные пользователя
   * @returns {Promise} Ответ от сервера с обновленными данными пользователя
   */
  updateUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(res => {
      return this._checkResponse(res);
    })
  }

  /**
   * Обновляет аватар пользователя
   * @returns {Promise} Ответ от сервера с обновленными данными пользователя
   */
   updateAvatar(avatarLink) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLink,
      })
    })
    .then(res => {
      return this._checkResponse(res);
    })
  }

  /**
   * Добавляет новую карточку на сервер
   * @returns {Promise} Ответ от сервера с объектом новой карточки
   */
   addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(res => {
      return this._checkResponse(res);
    })
  }

  /**
   * Удаляет карточку с сервера
   * @returns {Promise} Ответ от сервера
   */
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(res => {
      return this._checkResponse(res);
    })
  }

  /**
   * Ставит лайк карточке
   * @returns {Promise} Ответ от сервера с обновленным объектом карточки
   */
   setLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(res => {
      return this._checkResponse(res);
    })
  }

  /**
   * Убирает лайк карточке
   * @returns {Promise} Ответ от сервера с обновленным объектом карточки
   */
   removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(res => {
      return this._checkResponse(res);
    })
  }
}
