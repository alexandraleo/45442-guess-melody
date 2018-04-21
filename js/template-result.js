import {getElement, showScreen} from './show-screen.js';
import {moduleWelcome} from './template-welcome.js';
// import {results} from './data/game-results.js';

const resultTemplate = (result) => getElement(`<section class="main main--result">
  <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

  <h2 class="title">${result.header}</h2>
  <div class="main-stat">${result.stat}</div>
  <span class="main-comparison">${result.place}</span>
  <span role="button" tabindex="0" class="main-replay">${result.button}</span>
</section>`);
export const moduleResult = function () {
  const cloneResult = resultTemplate.cloneNode(true);
  const againButton = cloneResult.querySelector(`.main-replay`);
  againButton.addEventListener(`click`, () => showScreen(moduleWelcome()));
  return cloneResult;
};

// const templateResultVictory = getElement(`<section class="main main--result">
//   <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

//   <h2 class="title">Вы настоящий меломан!</h2>
//   <div class="main-stat">За&nbsp;3&nbsp;минуты и 25&nbsp;секунд
//     <br>вы&nbsp;набрали 12 баллов (8 быстрых)
//     <br>совершив 3 ошибки</div>
//   <span class="main-comparison">Вы заняли 2 место из 10. Это&nbsp;лучше чем у&nbsp;80%&nbsp;игроков</span>
//   <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
// </section>`);
// export const moduleResultVictory = function () {
//   const cloneVictory = templateResultVictory.cloneNode(true);
//   const againButton = cloneVictory.querySelector(`.main-replay`);
//   againButton.addEventListener(`click`, () => showScreen(moduleWelcome()));
//   return cloneVictory;
// };

// const templateResultTime = getElement(`<section class="main main--result">
//   <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

//   <h2 class="title">Увы и ах!</h2>
//   <div class="main-stat">Время вышло!<br>Вы не успели отгадать все мелодии</div>
//   <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
// </section>`);
// export const moduleResultTime = function () {
//   const cloneTime = templateResultTime.cloneNode(true);
//   const againButton = cloneTime.querySelector(`.main-replay`);
//   againButton.addEventListener(`click`, () => showScreen(moduleWelcome()));

//   return cloneTime;
// };

// const templateResultAttempts = getElement(`<section class="main main--result">
//   <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

//   <h2 class="title">Какая жалость!</h2>
//   <div class="main-stat">У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!</div>
//   <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
// </section>`);
// export const moduleResultAttempts = function () {
//   const cloneAttempts = templateResultAttempts.cloneNode(true);
//   const againButton = cloneAttempts.querySelector(`.main-replay`);
//   againButton.addEventListener(`click`, () => showScreen(moduleWelcome()));
//   return cloneAttempts;
// };


