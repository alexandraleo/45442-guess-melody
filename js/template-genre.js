import {getElement} from './show-screen.js';
import {play, answers} from './data/game.js';
import {game} from './main.js';
// import {templateHeader} from './header.js';
import {changeStateAttempt} from './data/state.js';
import {questions, getRandomQuestions, getRandomGenre, genreNames} from './data/questions.js';

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
    checkGenreAnswers();
    formInputsChecked.checked = false;
    play();
  });
  return cloneGenre;
};

const chosenGenreQuestions = getRandomQuestions(questions, 4);
const chosenGenre = getRandomGenre(chosenGenreQuestions);
const genreName = genreNames.get(chosenGenre);
const rightAnswers = [];
chosenGenreQuestions.forEach((answer) => {
  if (answer.genre === chosenGenre) {
    rightAnswers.push(chosenGenreQuestions.indexOf(answer));
  }
});

console.log(`Правильные ответы`, rightAnswers);

const genreSongTemplate = () => {
  const genres = [];
  for (let i = 0; i < chosenGenreQuestions.length; i++) {
    const index = i + 1;
    const genre = `<div class="genre-answer">
        <div class="player-wrapper">
          <div class="player">
            <audio src="${chosenGenreQuestions[i].src}"></audio>
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

const templateGenre = getElement(`<section class="main main--level main--level-genre">

<div class="main-wrap">
    <h2 class="title">Выберите ${genreName} треки</h2>
    <form class="genre">
      ${genreSongTemplate()}
      <button class="genre-answer-send" type="submit" disabled>Ответить</button>
    </form>
  </div>
</section>`);

const checkGenreAnswers = () => {
  const formInputs = document.querySelectorAll(`input[type=checkbox]`);
  const checkedInputs = [];
  for (let input of formInputs) {
    let array = Array.from(formInputs);
    if (input.checked) {
      checkedInputs.push(array.indexOf(input));
    }
  }
  let difference = checkedInputs.filter((x) => rightAnswers.indexOf(x) === -1).concat(rightAnswers.filter((x) => checkedInputs.indexOf(x) === -1));

  if (difference.length === 0) {
    answers.push({ right: true, time: 35 });
  } else {
    answers.push({ right: false, time: 35 });
    changeStateAttempt(game);
  }
  play();
};
