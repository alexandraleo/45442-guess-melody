import WelcomeView from '../game/welcome-view.js';
import Application from '../application.js';

export const moduleWelcome = () => {
  const welcome = new WelcomeView();

  welcome.onPlayClick = () => {
    Application.playGame();
  };
  return welcome.element;
};

