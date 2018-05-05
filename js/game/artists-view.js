import AbstractView from '../abstract-view.js';

export default class ArtistsView extends AbstractView {
  constructor(question) {
    super();
    this.question = question;
  }

  get template() {
    return `<div class="main-wrap">
    <h2 class="title main-title">${this.question.question}</h2>
    <div class="player-wrapper">
      <div class="player">
        <audio src="${this.question.src}"></audio>
        <button class="player-control player-control--pause"></button>
        <div class="player-track">
          <span class="player-status"></span>
        </div>
      </div>
    </div>
    <form class="main-list">
    ${this.question.answers.map((it, i) => {
    return (`<div class="main-answer-wrapper">
        <input class="main-answer-r" type="radio" id="answer-${i}" name="answer" value="${i}"/>
        <label class="main-answer" for="answer-${i}">
          <img class="main-answer-preview" src="${it.image.url}"
               alt="${it.title}" width="${it.image.width}" height="${it.image.height}">
          ${it.title}
        </label>
      </div>`);
  }).join(``)}
    </form>
  </div>`;
  }

  onPlayClick() {
  }

  bind() {
    const formNode = this.element.querySelector(`.main-list`);
    formNode.addEventListener(`change`, (evt) => {
      this.onPlayClick(evt);
    });

    const playerControl = this.element.querySelector(`.player-control`);
    playerControl.addEventListener(`click`, () => {
      const audio = this.element.querySelector(`audio`);
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
      playerControl.classList.toggle(`player-control--play`);
      playerControl.classList.toggle(`player-control--pause`);
    });
  }
}

