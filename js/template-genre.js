import {getElement, showScreen} from './show-screen.js';
import {templateHeader} from './header.js';
import {moduleResultVictory, moduleResultTime, moduleResultAttempts} from './template-result.js';

const templateGenre = getElement(`<section class="main main--level main--level-genre">
  ${templateHeader}
  <div class="main-wrap">
    <h2 class="title">Выберите инди-рок треки</h2>
    <form class="genre">
      <div class="genre-answer">
        <div class="player-wrapper">
          <div class="player">
            <audio></audio>
            <button class="player-control player-control--pause"></button>
            <div class="player-track">
              <span class="player-status"></span>
            </div>
          </div>
        </div>
        <input type="checkbox" name="answer" value="answer-1" id="a-1">
        <label class="genre-answer-check" for="a-1"></label>
      </div>

      <div class="genre-answer">
        <div class="player-wrapper">
          <div class="player">
            <audio></audio>
            <button class="player-control player-control--play"></button>
            <div class="player-track">
              <span class="player-status"></span>
            </div>
          </div>
        </div>
        <input type="checkbox" name="answer" value="answer-1" id="a-2">
        <label class="genre-answer-check" for="a-2"></label>
      </div>

      <div class="genre-answer">
        <div class="player-wrapper">
          <div class="player">
            <audio></audio>
            <button class="player-control player-control--play"></button>
            <div class="player-track">
              <span class="player-status"></span>
            </div>
          </div>
        </div>
        <input type="checkbox" name="answer" value="answer-1" id="a-3">
        <label class="genre-answer-check" for="a-3"></label>
      </div>

      <div class="genre-answer">
        <div class="player-wrapper">
          <div class="player">
            <audio></audio>
            <button class="player-control player-control--play"></button>
            <div class="player-track">
              <span class="player-status"></span>
            </div>
          </div>
        </div>
        <input type="checkbox" name="answer" value="answer-1" id="a-4">
        <label class="genre-answer-check" for="a-4"></label>
      </div>

      <button class="genre-answer-send" type="submit" disabled>Ответить</button>
    </form>
  </div>
</section>`);

export const moduleGenre = function () {
  const cloneGenre = templateGenre.cloneNode(true);
  const answerButton = cloneGenre.querySelector(`.genre-answer-send`);
  const formNode = cloneGenre.querySelector(`.genre`);

  formNode.addEventListener(`change`, () => {
    const formInputsChecked = formNode.querySelectorAll(`input[type=checkbox]:checked`);
    if (formInputsChecked.length > 0) {
      answerButton.disabled = false;
    } else {
      answerButton.disabled = true;
    }
  });

  answerButton.addEventListener(`click`, () => {
    const formInputsChecked = formNode.querySelectorAll(`input[type=checkbox]:checked`);
    formInputsChecked.checked = false;
    const results = [moduleResultVictory(), moduleResultTime(), moduleResultAttempts()];
    let resultVariant = Math.floor(Math.random() * results.length);
    showScreen(results[resultVariant]);
  });
  return cloneGenre;
};
