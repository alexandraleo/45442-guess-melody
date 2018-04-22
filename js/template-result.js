import {getElement, showScreen} from './show-screen.js';
import {moduleWelcome} from './template-welcome.js';
import {startState} from './data/game.js';

export const resultTemplate = (result) => getElement(`<section class="main main--result">
  <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

  <h2 class="title">${result.header}</h2>
  <div class="main-stat">${result.stat}</div>
  <span class="main-comparison">${result.place}</span>
  <span role="button" tabindex="0" class="main-replay">${result.button}</span>
</section>`);
export const moduleResult = function () {
  const cloneResult = resultTemplate.cloneNode(true);
  const againButton = cloneResult.querySelector(`.main-replay`);
  againButton.addEventListener(`click`, () => {
    startState();
    showScreen(moduleWelcome());
  });
  return cloneResult;
};

