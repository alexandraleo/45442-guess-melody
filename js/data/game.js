import {getRandomElement} from './utils.js';
import {moduleGenre} from '../template-genre.js';
import {moduleArtists} from '../template-artists.js';
import {scoringGame} from './game-results.js';
import {game} from './state.js';
import {showScreen} from '../show-screen.js';

export const answers = [];
export const play = () => {
  if (answers.length < 10 && game.attemptsLeft > 0) {
    const games = [moduleArtists(), moduleGenre()];
    return showScreen(games[getRandomElement(0, 1)]);
  } else if (game.attemptsLeft < 1) {
    let result = `attempts`;
    return Object.assign({}, game, {
      result
    });
  } else if (game.minutes === `00`) {
    let result = `time`;
    return Object.assign({}, game, {
      result
    });
  } else if (answers.length === 10 && game.attemptsLeft > 0) {
    scoringGame(answers, game.attemptsLeft);
    let result = `victory`;
    return Object.assign({}, game, {
      result
    });
  } else {
    return answers;
  }
};

export const changeStateAttempt = () => {
  let attemptsLeft = game.attemptsLeft - 1;
  return Object.assign({}, game, {
    attemptsLeft
  });
};
// console.log(answers);
