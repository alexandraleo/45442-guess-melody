import {getElement, showScreen} from './show-screen.js';
import {moduleArtists} from './template-artists.js';

const templateWelcome = getElement(`<section class="main main--welcome">
  <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
  <button class="main-play">Начать игру</button>
  <h2 class="title main-title">Правила игры</h2>
  <p class="text main-text">
    Правила просты&nbsp;— за&nbsp;5 минут ответить на все вопросы.<br>
    Ошибиться можно 3 раза.<br>
    Удачи!
  </p>
</section>`);
export const moduleWelcome = function () {
  const cloneWelcome = templateWelcome.cloneNode(true);
  const buttonPlay = cloneWelcome.querySelector(`.main-play`);
  buttonPlay.addEventListener(`click`, () => showScreen(moduleArtists()));
  return cloneWelcome;
};
