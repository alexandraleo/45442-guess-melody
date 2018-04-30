import {moduleGenre} from '../templates/template-genre.js';
import {moduleArtists} from '../templates/template-artists.js';
import {initialState, canPlay} from './state.js';
import {moduleResult} from '../templates/template-result.js';
import {templateHeader} from '../templates/template-header.js';
import {getElement, showScreen} from '../show-screen.js';
import {questions} from './questions.js';
import {scoringGame, chooseWordsEndings, scoringPlayers, scoringFast} from './game-results.js';

export let game;

export const startState = () => {
  game = Object.assign({}, initialState);
  game.answers = []; // Shallow copy
};
startState();

export const gameOver = () => {
  const totalScore = scoringGame(game.answers, game.attemptsLeft);
  const totalFast = scoringFast(game.answers);
  const playersScores = [10, 15, 20, 3, 7];
  const mistakes = 3 - game.attemptsLeft;
  const wordMistake = chooseWordsEndings(mistakes, [`ошибку`, `ошибки`, `ошибок`]);
  const wordMinutes = chooseWordsEndings(game.minutes, [`минуту`, `минуты`, `минут`]);
  const wordSeconds = chooseWordsEndings(game.seconds, [`секунду`, `секунды`, `секунд`]);
  const wordPoints = chooseWordsEndings(totalScore, [`балл`, `балла`, `баллов`]);
  const wordFast = chooseWordsEndings(totalFast, [`быстрый`, `быстрых`, `быстрых`]);
  const results = {
    victory: {
      header: `Вы настоящий меломан!`,
      stat: `За&nbsp;${wordMinutes} и&nbsp;${wordSeconds} <br>вы&nbsp;набрали ${wordPoints} (${wordFast})
<br>совершив ${wordMistake}`,
      place: `<span class="main-comparison">${scoringPlayers(playersScores, totalScore)}</span>`,
      button: `Сыграть ещё раз`
    },
    time: {
      header: `Увы и ах!`,
      stat: `Время вышло!<br>Вы не успели отгадать все мелодии`,
      place: ``,
      button: `Попробовать ещё раз`
    },
    attempts: {
      header: `Какая жалость!`,
      stat: `У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!`,
      place: ``,
      button: `Попробовать ещё раз`
    }
  };
  let end = `attempts`;
  if (game.minutes === `00`) {
    end = `time`;
  } else if (game.answers.length === 10) {
    end = `victory`;
  }
  return showScreen(moduleResult(results[end]));
};

export const chooseGame = () => {
  const question = questions[game.answers.length];
  if (canPlay(game)) {
    const moduleHeader = getElement(templateHeader(game));
    if (question.type === `genre`) {
      showScreen(moduleHeader, moduleGenre(question));
    } else if (question.type === `artist`) {
      showScreen(moduleHeader, moduleArtists(question));
    }
  } else {
    gameOver();
  }
};

export const getAnswers = (accuracy, timer = 35) => {
  game.answers.push({right: accuracy, time: timer});
};

