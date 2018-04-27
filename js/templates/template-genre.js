import {getElement} from '../show-screen.js';
import {chooseGame, game} from '../data/game.js';
import {changeStateAttempt} from '../data/state.js';

export const moduleGenre = (question) => {
  const cloneGenre = templateGenre(question).cloneNode(true);
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

  formNode.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    const formInputsChecked = formNode.querySelectorAll(`input[type=checkbox]:checked`);
    checkGenreAnswers(question);
    formInputsChecked.checked = false;
    chooseGame();
  });
  return cloneGenre;
};

const genreSongTemplate = (question) => {
  const genres = [];
  for (let i = 0; i < 4; i++) {
    const index = i + 1;
    const genre = `<div class="genre-answer">
        <div class="player-wrapper">
          <div class="player">
            <audio src="${question.answers[i].src}"></audio>
            <button class="player-control player-control--pause"></button>
            <div class="player-track">
              <span class="player-status"></span>
            </div>
          </div>
        </div>
        <input type="checkbox" name="answer" value="answer-1" id="a-${index}">
        <label class="genre-answer-check" for="a-${index}"></label>
      </div>`;
    genres.push(genre);
  }
  return genres.join(``);
};
const templateGenre = (question) => getElement(`<section class="main main--level main--level-genre">
  <div class="main-wrap">
    <h2 class="title">${question.question}</h2>
    <form class="genre">
      ${genreSongTemplate(question)}
      <button class="genre-answer-send" type="submit" disabled>Ответить</button>
    </form>
  </div>
  </section>`);

const checkGenreAnswers = (question) => {
  const formInputs = document.querySelectorAll(`input[type=checkbox]`);
  const checkedInputs = [];
  for (let input of formInputs) {
    let array = Array.from(formInputs);
    if (input.checked) {
      checkedInputs.push(array.indexOf(input));
    }
  }
  let right = [];
  for (let answer of question.answers) {
    if (question.genre === answer.genre) {
      right.push(question.answers.indexOf(answer));
    }
  }
  let difference = checkedInputs.filter((x) => right.indexOf(x) === -1).concat(right.filter((x) => checkedInputs.indexOf(x) === -1));

  if (difference.length === 0) {
    game.answers.push({right: true, time: 35});
  } else {
    game.answers.push({right: false, time: 35});
    changeStateAttempt(game);
  }
  return game;
};

