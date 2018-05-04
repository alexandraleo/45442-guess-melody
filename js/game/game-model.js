// import {initialState} from '../data/game.js';
import {questions} from '../data/questions.js';


const initialState = Object.freeze({
  attemptsLeft: 3,
  minutes: `05`,
  seconds: `00`,
  totalSeconds: 300,
  answers: []
});

export default class GameModel {
  constructor() {
    this.startState();
  }

  game() {
    return this.game;
  }

  startState() {
    this.game = Object.assign({}, initialState);
    this.game.answers = [];
    // this.game.seconds = +this.game.minutes * 60 + +this.game.seconds;
    this.game.timeLeft = this.game.totalSeconds;
  }

  canPlay() {
    return this.game.attemptsLeft - 1 >= 0 && this.game.answers.length + 1 <= 10;
  }

  changeStateAttempt() {
    if (!this.canPlay()) {
      throw new Error(`Попытки закончились`);
    }
    this.game.attemptsLeft -= 1;
    return this.game;
  }

  tick() {
    this.game.timeLeft--;
    this.game.minutes = `0${Math.floor(this.game.timeLeft / 60)}`;
    this.game.seconds = `${this.game.timeLeft % 60}`;
  }

  getTimeRatio() {
    return Math.round((1 - this.game.timeLeft / this.game.totalSeconds) * 1000) / 1000;
  }

  getQuestion() {
    return questions[this.game.answers.length];
  }

  getAnswers(accuracy, timer = 35) {
    this.game.answers.push({right: accuracy, time: timer});
  }

  reduceScore(initial, current) {
    if (current.right) {
      return initial + (current.time < 30 ? 2 : 1);
    } else {
      return initial - 2;
    }
  }

  reduceTime(initial, current) {
    if (current.right && current.time < 30) {
      return initial + 1;
    } else {
      return initial;
    }
  }

  scoringFast(answers) {
    return answers.reduce(this.reduceTime(), 0);
  }

  scoringGame(answers, attemptsLeft) {
    if (answers.length < 10 || attemptsLeft < 1) {
      return -1;
    }
    return answers.reduce(this.reduceScore(), 0);
  }

  scoringPlayers(playersScores, playerScore) {
    if (playerScore.attemptsLeft < 1) {
      return `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
    } else if (playerScore.timeLeft === 0) {
      return `Время вышло! Вы не успели отгадать все мелодии`;
    }
    const newScores = [...playersScores];
    newScores.push(playerScore);
    newScores.sort((a, b) => b - a);
    const place = newScores.indexOf(playerScore) + 1;
    const quantity = newScores.length;
    const percent = Math.floor((quantity - place) / quantity * 100);
    return `Вы заняли ${place} место из ${quantity} игроков. Это лучше, чем у ${percent}% игроков`;
  }

  chooseWordsEndings(number, words) {
    const cases = [2, 0, 1, 1, 1, 2];
    const wordIndex = (number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5];
    return `${number} ${words[wordIndex]}`;
  }

  checkArtistsAnswers(evt, question) {
    const right = question.answers.findIndex((answer) => {
      return answer.isCorrect;
    });
    const currentIndex = +evt.target.value;
    let accuracy = true;
    if (currentIndex !== right) {
      accuracy = false;
      this.changeStateAttempt(this.game);
    }
    this.getAnswers(accuracy);
    return this.game;
  }

  checkGenreAnswers(question) {
    const formInputs = document.querySelectorAll(`input[type=checkbox]`);
    const checkedInputs = [];
    for (let input of formInputs) {
      let array = Array.from(formInputs);
      if (input.checked) {
        checkedInputs.push(array.indexOf(input));
      }
    }
    let right = [];
    for (let answer of question.answers) {
      if (question.genre === answer.genre) {
        right.push(question.answers.indexOf(answer));
      }
    }
    let difference = checkedInputs.filter((x) => right.indexOf(x) === -1).concat(right.filter((x) => checkedInputs.indexOf(x) === -1));
    let accuracy = true;
    if (difference.length !== 0) {
      accuracy = false;
      this.changeStateAttempt(this.game);
    }
    this.getAnswers(accuracy);
    return this.game;
  }
}
