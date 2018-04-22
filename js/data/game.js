import {getRandomElement} from './utils.js';
// import {moduleWelcome} from '../template-welcome.js';
import {moduleGenre} from '../template-genre.js';
import {game} from '../main.js';
import {moduleArtists} from '../template-artists.js';
import {scoringGame, results} from './game-results.js';
import {initialState, canPlay} from './state.js';
import {showScreen} from '../show-screen.js';
import {resultTemplate} from '../template-result.js';
import {templateHeader} from '../header.js';

// export let game;
export let answers = [];

export const startState = () => {
  answers = [];
  return Object.assign({}, initialState);
};


// updateState();

export const play = () => {
  if (answers.length < 10 && canPlay(game)) {
    updateState();
    const games = [moduleArtists(), moduleGenre()];
    console.log(updateState());
    return showScreen(games[getRandomElement(0, 1)]);
  } else if (!canPlay(game)) {
    const end = gameOver(`attempts`);
    return showScreen(end);
  } else if (game.minutes === `00`) {
    const end = gameOver(`time`);
    showScreen(end);
  } else if (answers.length === 10 && canPlay(game)) {
    game.score = scoringGame(answers, game.attemptsLeft);
    const end = gameOver(`victory`);
    showScreen(end);
  }
  return game;
};
export const updateState = () => {
  return templateHeader(game);
};
const gameOver = (result) => {
  game.result = result;
  return resultTemplate(results[game.result]);
};
