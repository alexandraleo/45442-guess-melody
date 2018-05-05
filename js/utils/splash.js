import AbstractView from '../abstract-view.js';

export default class SplashScreen extends AbstractView {
  constructor() {
    super();
    this.quantity = 0;
    this.symbol = `/—\\|`;
    // this.symbol = [`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`,
    //   `<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`,
    //   `<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`];
  }
  get template() {
    return `<div></div>`;
    // return `<div><p>Загружается</p></div>`;
  }

  start() {
    this.quantity = ++this.quantity >= this.symbol.length ? 0 : this.quantity;
    this.element.textContent = this.symbol[this.quantity];
    this.timeout = setTimeout(() => this.start(), 50);
  }

  stop() {
    clearTimeout(this.timeout);
  }
}
