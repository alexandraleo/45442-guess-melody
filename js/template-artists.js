import {getElement, showScreen} from './show-screen.js';
import {templateHeader} from './header.js';
import {moduleGenre} from './template-genre.js';
import {questions, getArtistQuestions} from './data/questions.js';

const chosenQuestions = getArtistQuestions(questions);
const chosenSong = chosenQuestions.findIndex((question) => {
  return question.song === true;
});
const songTemplate = () => {
  let artists = [];
  for (let i = 0; i < 3; i++) {
    let artist = `<div class="main-answer-wrapper">
        <input class="main-answer-r" type="radio" id="answer-${i + 1}" name="answer" value="val-${i + 1}"/>
        <label class="main-answer" for="answer-${i + 1}">
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

export const moduleArtists = function () {
  const cloneArtists = templateArtists.cloneNode(true);
  const answersNodes = cloneArtists.querySelectorAll(`.main-wrap`);
  for (const answer of answersNodes) {
    answer.addEventListener(`click`, () => showScreen(moduleGenre()));
  }
  return cloneArtists;
};
