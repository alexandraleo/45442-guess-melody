import {getElement} from './show-screen.js';
import {play, answers, updateState} from './data/game.js';
import {game} from './main.js';
import {changeStateAttempt} from './data/state.js';
import {questions, getRandomQuestions, getRandomArtist} from './data/questions.js';
import {templateHeader} from './header.js';

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
//     this.chosenQuestions = getRandomQuestions(questions, 3);
//   },
//   chooseArtist() {
//     this.chosenArtist = getRandomArtist(this.chosenQuestions);
//   }
// };


const chosenQuestions = getRandomArtist(getRandomQuestions(questions, 3));

const chosenSong = chosenQuestions.findIndex((question) => {
  return question.song === true;
});
console.log(`'chosenSong: '`, chosenSong);

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
    changeStateAttempt(game);
  }
  play();
  updateState();
};
