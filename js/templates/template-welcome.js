import WelcomeView from '../game/welcome-view.js';
import {chooseGame} from '../data/game.js';

export const moduleWelcome = () => {
  const welcome = new WelcomeView();

  welcome.onPlayClick = () => {
    chooseGame();
  };
  return welcome.element;
};

