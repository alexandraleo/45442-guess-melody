import AbstractView from '../abstract-view.js';
import Application from '../application.js';

export default class ResultsView extends AbstractView {
  constructor(result) {
    super();
    this.result = result;
  }

  get template() {
    return `<section class="main main--result">
  <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

  <h2 class="title">${this.result.header}</h2>
  <div class="main-stat">${this.result.stat}</div>
  <span class="main-comparison">${this.result.place}</span>
  <span role="button" tabindex="0" class="main-replay">${this.result.button}</span>
</section>`;
  }

  onPlayClick() {
  }

  bind() {
    const againButton = this.element.querySelector(`.main-replay`);
    againButton.addEventListener(`click`, () => {
      Application.showWelcome();
    });
  }
}

