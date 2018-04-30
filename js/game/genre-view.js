import AbstractView from '../abstract-view.js';

export default class GenreView extends AbstractView {
  constructor(question) {
    super();
    this.question = question;
  }

  get template() {
    return `<section class="main main--level main--level-genre">
  <div class="main-wrap">
    <h2 class="title">${this.question.question}</h2>
    <form class="genre">
      ${this.question.answers.map((it, i) => {
    return (`<div class="genre-answer">
        <div class="player-wrapper">
          <div class="player">
            <audio src="${it.src}"></audio>
            <button class="player-control player-control--pause"></button>
            <div class="player-track">
              <span class="player-status"></span>
            </div>
          </div>
        </div>
        <input type="checkbox" name="answer" value="answer-1" id="a-${i}">
        <label class="genre-answer-check" for="a-${i}"></label>
      </div>`);
  }).join(``)}
      <button class="genre-answer-send" type="submit" disabled>Ответить</button>
    </form>
  </div>
  </section>`;
  }

  onPlayClick() {
  }

  bind() {
    const answerButton = this.element.querySelector(`.genre-answer-send`);
    const formNode = this.element.querySelector(`.genre`);
    const formInputs = this.element.querySelectorAll(`input[type=checkbox]`);

    formNode.addEventListener(`change`, () => {
      const variants = Array.from(formInputs);
      answerButton.disabled = !variants.some((variant) => variant.checked);
    });

    formNode.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      formInputs.checked = false;
      this.onPlayClick();
    });
  }
}

