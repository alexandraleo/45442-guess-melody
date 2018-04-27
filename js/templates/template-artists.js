import {getElement} from '../show-screen.js';
import {chooseGame, game} from '../data/game.js';
import {changeStateAttempt} from '../data/state.js';

export const moduleArtists = function (question) {
  const cloneArtists = templateArtists(question).cloneNode(true);
  const formNode = cloneArtists.querySelector(`.main-list`);
  formNode.addEventListener(`change`, (evt) => {
    checkAnswers(evt, question);
    chooseGame();
  });
  return cloneArtists;
};

const songTemplate = (question) => {
  let artists = [];
  for (let i = 0; i < 3; i++) {
    let artist = `<div class="main-answer-wrapper">
        <input class="main-answer-r" type="radio" id="answer-${i}" name="answer" value="${i}"/>
        <label class="main-answer" for="answer-${i}">
          <img class="main-answer-preview" src="${question.answers[i].image.url}"
               alt="${question.answers[i].title}" width="${question.answers[i].image.width}" height="${question.answers[i].image.height}">
          ${question.answers[i].title}
        </label>
      </div>`;
    artists.push(artist);
  }
  return artists.join(``);
};

const templateArtists = (question) => getElement(`<section class="main main--level main--level-artist">
<div class="main-wrap">
    <h2 class="title main-title">${question.question}</h2>
    <div class="player-wrapper">
      <div class="player">
        <audio src="${question.src}"></audio>
        <button class="player-control player-control--pause"></button>
        <div class="player-track">
          <span class="player-status"></span>
        </div>
      </div>
    </div>
    <form class="main-list">
    ${songTemplate(question)}
    </form>
  </div>
  </section>`);

const checkAnswers = (evt, question) => {
  const right = question.answers.findIndex((answer) => {
    return answer.isCorrect;
  });
  const currentIndex = +evt.target.value;
  if (currentIndex === right) {
    game.answers.push({right: true, time: 35});
  } else {
    game.answers.push({right: false, time: 35});
    changeStateAttempt(game);
  }
  return game;
};
