import AbstractView from '../abstract-view.js';

export default class ErrorView extends AbstractView {
  constructor(error) {
    super();
    this.error = error;
  }
  get template() {
    return `<div class="error">
      <p>Произошла ошибка: ${this.error.message}</p>
    </div>`;
  }

}
