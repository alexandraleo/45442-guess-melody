import {getElement} from './show-screen.js';
import {templateHeader} from './header.js';
import {play, answers, changeStateAttempt} from './data/game.js';
import {questions, getRandomQuestions, getRandomArtist} from './data/questions.js';

export const moduleArtists = function () {
  const cloneArtists = templateArtists.cloneNode(true);
  const answersNodes = cloneArtists.querySelectorAll(`.main-answer-wrapper`);

  for (const answer of answersNodes) {
    answer.addEventListener(`click`, (evt) => {
      checkAnswers(evt, answersNodes);
    });
  }
  return cloneArtists;
};

// const newGame = {
//   chooseQuestions() {
//     questionsObj.chosenQuestions = getRandomQuestions(questions, 3);
//   },
//   chooseArtist() {
//     questionsObj.chosenArtist = getRandomArtist(questionsObj.chosenQuestions);
//   }
// };
// const questionsObj = {};
// console.log(questionsObj);
// console.log(newGame.chooseQuestions());
// console.log(newGame.chooseArtist());
// console.log(newGame.chosenArtist);


const chosenQuestions = getRandomArtist(getRandomQuestions(questions, 3));

const chosenSong = chosenQuestions.findIndex((question) => {
  return question.song === true;
});
// console.log(`'chosenSong: '`, chosenSong);

const songTemplate = () => {
  let artists = [];
  for (let i = 0; i < 3; i++) {
    const index = i + 1;
    let artist = `<div class="main-answer-wrapper">
        <input class="main-answer-r" type="radio" id="answer-${index}" name="answer" value="val-${index}"/>
        <label class="main-answer" for="answer-${index}">
          <img class="main-answer-preview" src="${chosenQuestions[i].image}"
               alt="${chosenQuestions[i].artist}" width="134" height="134">
          ${chosenQuestions[i].artist}
        </label>
      </div>`;
    artists.push(artist);
  }
  return artists.join(``);
};
const templateArtists = getElement(`<section class="main main--level main--level-artist">
  ${templateHeader}
  <div class="main-wrap">
    <h2 class="title main-title">Кто исполняет эту песню?</h2>
    <div class="player-wrapper">
      <div class="player">
        <audio src="${chosenQuestions[chosenSong].src}"></audio>
        <button class="player-control player-control--pause"></button>
        <div class="player-track">
          <span class="player-status"></span>
        </div>
      </div>
    </div>
    <form class="main-list">
    ${songTemplate()}
    </form>
  </div>
</section>`);

const checkAnswers = (evt, array) => {
  if (evt.currentTarget === array[chosenSong]) {
    answers.push({right: true, time: 35});
  } else {
    answers.push({right: false, time: 35});
    changeStateAttempt();
  }
  play();
};
