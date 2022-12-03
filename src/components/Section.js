/**
 * Класс отвечающий за отрисовку элементов на странице
 */
export default class Section {
  /**
   * @consctructor
   * @param {Array} items Массив данных, которые нужно добавить на страницу
   * @param {Function} renderer Функция, которая отвечает за создание и отрисовку данных на странице
   * @param {string} containerSelector Cелектор контейнера, в который нужно добавлять элементы
   */
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;

    this._container = document.querySelector(containerSelector);
  }

  /**
   * Функция отрисовки всех элементов
   */
  renderItems() {
    for (let i = this._renderedItems.length - 1; i >= 0; i--) {
      this._renderer(this._renderedItems[i]);
    }
  }

  /**
   * Фукнция добавления DOM-элемента в начало контейнера
   * @param {element} item DOM-элемент, который нужно добавить в контейнер
   */
   addItem(item) {
    this._container.prepend(item);
  }
}
