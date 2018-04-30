import {assert} from 'chai';
import {scoringGame, scoringPlayers, chooseWordsEndings} from './game-results.js';

describe(`Проверка результатов`, () => {
  describe(`Проверка массива ответов игрока`, () => {
    const testAnswers = [
      {right: true, time: 10},
      {right: true, time: 15},
      {right: true, time: 29},
      {right: true, time: 28},
      {right: true, time: 32},
      {right: true, time: 35},
      {right: true, time: 35},
      {right: false, time: 35},
      {right: true, time: 35},
      {right: true, time: 98},
      {right: true, time: 115}
    ];

    it(`Должен вернуть -1, если длина массива ответов < 10`, () => {
      assert.equal(-1, scoringGame([1, 2, 3], 1));
    });
    it(`Должен вернуть -1, если попыток не осталось`, () => {
      assert.equal(-1, scoringGame(testAnswers, 0));
    });
    it(`Должен вернуть 12, на заданном массиве 4*2 + 6*1 -2`, () => {
      assert.equal(12, scoringGame(testAnswers, 1));
    });
    it(`Должен вернуть 8, на заданном массиве 3*2 + 6*1 - 2*2`, () => {
      testAnswers[0].right = false;
      assert.equal(8, scoringGame(testAnswers, 1));
    });
    it(`Должен вернуть 9, на заданном массиве 4*2 + 5*1 - 2*2`, () => {
      testAnswers[0].right = false;
      testAnswers[9].time = 17;
      assert.equal(9, scoringGame(testAnswers, 2));
    });
  });
  describe(`Проверка вывода результатов игры`, () => {
    const testPlayers = [2, 11, 12, 3, 25];

    it(`Закончились попытки`, () => {
      const testAttempts = {totalScore: 10, attemptsLeft: 0, timeLeft: 20};
      assert.equal(`У вас закончились все попытки. Ничего, повезёт в следующий раз!`, scoringPlayers(testPlayers, testAttempts));
    });
    it(`Вышло время`, () => {
      const testTime = {totalScore: 10, attemptsLeft: 2, timeLeft: 0};
      assert.equal(`Время вышло! Вы не успели отгадать все мелодии`, scoringPlayers(testPlayers, testTime));
    });
    it(`Результат игрока`, () => {
      const testPlayerResult = 10;
      assert.equal(`Вы заняли 4 место из 6 игроков. Это лучше, чем у 33% игроков`, scoringPlayers(testPlayers, testPlayerResult));
    });
    it(`Результат игрока`, () => {
      const testPlayerResult = 70;
      assert.equal(`Вы заняли 1 место из 6 игроков. Это лучше, чем у 83% игроков`, scoringPlayers(testPlayers, testPlayerResult));
    });
    it(`Результат игрока - повторяющееся значение`, () => {
      const testPlayerResult = 11;
      assert.equal(`Вы заняли 3 место из 6 игроков. Это лучше, чем у 50% игроков`, scoringPlayers(testPlayers, testPlayerResult));
    });
    it(`Результат игрока - последнее место`, () => {
      const testPlayerResult = {totalScore: 1, attemptsLeft: 2, timeLeft: 20};
      assert.equal(`Вы заняли 6 место из 6 игроков. Это лучше, чем у 0% игроков`, scoringPlayers(testPlayers, testPlayerResult));
    });
  });
  describe(`Проверка окончаний`, () => {
    it(`С числом 1 ошибка`, () => {
      assert.equal(`1 ошибку`, chooseWordsEndings(1, [`ошибку`, `ошибки`, `ошибок`]));
    });
    it(`С числом 11 минута`, () => {
      assert.equal(`11 минут`, chooseWordsEndings(11, [`минуту`, `минуты`, `минут`]));
    });
    it(`С числом 2 минута`, () => {
      assert.equal(`2 минуты`, chooseWordsEndings(2, [`минуту`, `минуты`, `минут`]));
    });
    it(`С числом 2 ошибка`, () => {
      assert.equal(`2 ошибки`, chooseWordsEndings(2, [`ошибку`, `ошибки`, `ошибок`]));
    });
    it(`С числом 20 секунда`, () => {
      assert.equal(`20 секунд`, chooseWordsEndings(20, [`секунду`, `секунды`, `секунд`]));
    });
    it(`С числом 105 ошибка`, () => {
      assert.equal(`105 ошибок`, chooseWordsEndings(105, [`ошибку`, `ошибки`, `ошибок`]));
    });
    it(`С числом 22 секунда`, () => {
      assert.equal(`22 секунды`, chooseWordsEndings(22, [`секунду`, `секунды`, `секунд`]));
    });
    it(`С числом 22 год`, () => {
      assert.equal(`22 года`, chooseWordsEndings(22, [`год`, `года`, `лет`]));
    });
    it(`С числом 21 год`, () => {
      assert.equal(`21 год`, chooseWordsEndings(21, [`год`, `года`, `лет`]));
    });
    it(`С числом 105 год`, () => {
      assert.equal(`105 лет`, chooseWordsEndings(105, [`год`, `года`, `лет`]));
    });
  });
});

