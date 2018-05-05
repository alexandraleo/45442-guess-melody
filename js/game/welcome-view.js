import AbstractView from '../abstract-view.js';
import Application from '../application.js';

export default class WelcomeView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `<section class="main main--welcome">
  <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
  <button class="main-play">Начать игру</button>
  <h2 class="title main-title">Правила игры</h2>
  <p class="text main-text">
    Правила просты&nbsp;— за&nbsp;5 минут ответить на все вопросы.<br>
    Ошибиться можно 3 раза.<br>
    Удачи!
  </p>
</section>`;
  }

  disableBtn() {
    this.element.querySelector(`.main-play`).disabled = true;
  }

  unableBtn() {
    this.element.querySelector(`.main-play`).removeAttribute(`disabled`);
  }

  onPlayClick() {
  }

  bind() {
    const btn = this.element.querySelector(`.main-play`);
    btn.addEventListener(`click`, () => {
      Application.playGame();
    });
  }
}
