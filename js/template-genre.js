import {getElement} from './show-screen.js';
import {templateHeader} from './header.js';
import {play, answers, changeStateAttempt} from './data/game.js';
import {questions, getRandomQuestions, getRandomGenre, genreNames} from './data/questions.js';
// import {moduleResultVictory, moduleResultTime, moduleResultAttempts} from './template-result.js';

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
    // const results = [moduleResultVictory(), moduleResultTime(), moduleResultAttempts()];
    // let resultVariant = Math.floor(Math.random() * results.length);
    play();
  });
  return cloneGenre;
};
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
    answers.push({right: true, time: 35});
  } else {
    answers.push({right: false, time: 35});
    changeStateAttempt();
  }
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
// console.log(`Правильные ответы`, rightAnswers);

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
  ${templateHeader}
  <div class="main-wrap">
    <h2 class="title">Выберите ${genreName} треки</h2>
    <form class="genre">
      ${genreSongTemplate()}
      <button class="genre-answer-send" type="submit" disabled>Ответить</button>
    </form>
  </div>
</section>`);
