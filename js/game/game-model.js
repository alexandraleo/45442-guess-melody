// import {questions} from '../data/questions.js';


const initialState = Object.freeze({
  attemptsLeft: 3,
  totalSeconds: 300,
  answers: []
});

export default class GameModel {
  constructor(questions) {
    this.questions = questions;
    this.startState();
  }

  game() {
    return this.game;
  }

  startState() {
    this.game = Object.assign({}, initialState);
    this.game.answers = [];
    this.game.timeLeft = this.game.totalSeconds;
  }

  get canPlay() {
    return this.game.attemptsLeft - 1 >= 0 &&
     this.game.answers.length + 1 <= 10 &&
      this.game.timeLeft > 0;
  }

  changeStateAttempt() {
    if (!this.canPlay) {
      throw new Error(`Попытки закончились`);
    }
    this.game.attemptsLeft -= 1;
    return this.game;
  }

  tick() {
    this.game.timeLeft--;
  }

  getQuestion() {
    return this.questions[this.game.answers.length];
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
    return answers.reduce(this.reduceTime, 0);
  }

  scoringGame(answers, attemptsLeft) {
    if (answers.length < 10 || attemptsLeft < 1) {
      return -1;
    }
    return answers.reduce(this.reduceScore, 0);
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

  checkArtistsAnswers(evt, question, timer) {
    const right = question.answers.findIndex((answer) => {
      return answer.isCorrect;
    });
    const currentIndex = +evt.target.value;
    let accuracy = true;
    if (currentIndex !== right) {
      accuracy = false;
      this.changeStateAttempt(this.game);
    }
    this.getAnswers(accuracy, timer);
    return this.game;
  }

  checkGenreAnswers(question, timer) {
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
    this.getAnswers(accuracy, timer);
    return this.game;
  }

  gameOver() {
    let end = `attempts`;
    if (this.game.timeLeft === 0) {
      end = `time`;
    } else if (this.game.answers.length === 10) {
      end = `victory`;
    }

    const totalScore = this.scoringGame(this.game.answers, this.game.attemptsLeft);
    const totalFast = this.scoringFast(this.game.answers);
    const playersScores = [10, 15, 20, 3, 7];
    const mistakes = 3 - this.game.attemptsLeft;
    const wordMistake = this.chooseWordsEndings(mistakes, [`ошибку`, `ошибки`, `ошибок`]);
    const wordMinutes = this.chooseWordsEndings(Math.floor(this.game.timeLeft / 60), [`минуту`, `минуты`, `минут`]);
    const wordSeconds = this.chooseWordsEndings(this.game.timeLeft % 60, [`секунду`, `секунды`, `секунд`]);
    const wordPoints = this.chooseWordsEndings(totalScore, [`балл`, `балла`, `баллов`]);
    const wordFast = this.chooseWordsEndings(totalFast, [`быстрый`, `быстрых`, `быстрых`]);
    const results = {
      victory: {
        header: `Вы настоящий меломан!`,
        stat: `За&nbsp;${wordMinutes} и&nbsp;${wordSeconds} <br>вы&nbsp;набрали ${wordPoints} (${wordFast})
  <br>совершив ${wordMistake}`,
        place: `<span class="main-comparison">${this.scoringPlayers(playersScores, totalScore)}</span>`,
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
    return results[end];
  }
}
