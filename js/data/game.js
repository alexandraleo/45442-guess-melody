// import {moduleGenre} from '../templates/template-genre.js';
// import {moduleArtists} from '../templates/template-artists.js';
// import {moduleResult} from '../templates/template-result.js';
// import {moduleHeader} from '../templates/template-header.js';
// import {showScreen} from '../show-screen.js';
// import {questions} from './questions.js';
// import {scoringGame, chooseWordsEndings, scoringPlayers, scoringFast} from './game-results.js';



// export let game;
// export const startState = () => {
//   game = Object.assign({}, initialState);
//   game.answers = []; // Shallow copy
// };
// startState();

// export const gameOver = () => {
//   const totalScore = scoringGame(game.answers, game.attemptsLeft);
//   const totalFast = scoringFast(game.answers);
//   const playersScores = [10, 15, 20, 3, 7];
//   const mistakes = 3 - game.attemptsLeft;
//   const wordMistake = chooseWordsEndings(mistakes, [`ошибку`, `ошибки`, `ошибок`]);
//   const wordMinutes = chooseWordsEndings(game.minutes, [`минуту`, `минуты`, `минут`]);
//   const wordSeconds = chooseWordsEndings(game.seconds, [`секунду`, `секунды`, `секунд`]);
//   const wordPoints = chooseWordsEndings(totalScore, [`балл`, `балла`, `баллов`]);
//   const wordFast = chooseWordsEndings(totalFast, [`быстрый`, `быстрых`, `быстрых`]);
//   const results = {
//     victory: {
//       header: `Вы настоящий меломан!`,
//       stat: `За&nbsp;${wordMinutes} и&nbsp;${wordSeconds} <br>вы&nbsp;набрали ${wordPoints} (${wordFast})
// <br>совершив ${wordMistake}`,
//       place: `<span class="main-comparison">${scoringPlayers(playersScores, totalScore)}</span>`,
//       button: `Сыграть ещё раз`
//     },
//     time: {
//       header: `Увы и ах!`,
//       stat: `Время вышло!<br>Вы не успели отгадать все мелодии`,
//       place: ``,
//       button: `Попробовать ещё раз`
//     },
//     attempts: {
//       header: `Какая жалость!`,
//       stat: `У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!`,
//       place: ``,
//       button: `Попробовать ещё раз`
//     }
//   };
//   let end = `attempts`;
//   if (game.minutes === `00`) {
//     end = `time`;
//   } else if (game.answers.length === 10) {
//     end = `victory`;
//   }
//   return showScreen(moduleResult(results[end]));
// };

// export const chooseGame = () => {
//   const question = questions[game.answers.length];
//   if (canPlay(game)) {
//     if (question.type === `genre`) {
//       showScreen(moduleHeader(game), moduleGenre(question));
//     } else if (question.type === `artist`) {
//       showScreen(moduleHeader(game), moduleArtists(question));
//     }
//   } else {
//     gameOver();
//   }
// };

// export const getAnswers = (accuracy, timer = 35) => {
//   game.answers.push({right: accuracy, time: timer});
// };

// export const checkArtistsAnswers = (evt, question) => {
//   const right = question.answers.findIndex((answer) => {
//     return answer.isCorrect;
//   });
//   const currentIndex = +evt.target.value;
//   let accuracy = true;
//   if (currentIndex !== right) {
//     accuracy = false;
//     changeStateAttempt(game);
//   }
//   getAnswers(accuracy);
//   return game;
// };

// export const checkGenreAnswers = (question) => {
//   const formInputs = document.querySelectorAll(`input[type=checkbox]`);
//   const checkedInputs = [];
//   for (let input of formInputs) {
//     let array = Array.from(formInputs);
//     if (input.checked) {
//       checkedInputs.push(array.indexOf(input));
//     }
//   }
//   let right = [];
//   for (let answer of question.answers) {
//     if (question.genre === answer.genre) {
//       right.push(question.answers.indexOf(answer));
//     }
//   }
//   let difference = checkedInputs.filter((x) => right.indexOf(x) === -1).concat(right.filter((x) => checkedInputs.indexOf(x) === -1));
//   let accuracy = true;
//   if (difference.length !== 0) {
//     accuracy = false;
//     changeStateAttempt(game);
//   }
//   getAnswers(accuracy);
//   return game;
// };
