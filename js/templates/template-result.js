// import {moduleWelcome} from '../templates/template-welcome.js';
import ResultsView from '../game/results-view.js';
// import GameModel from '../game/game-model.js';
import Application from '../application.js';

export const moduleResult = (result) => {
  const results = new ResultsView(result);

  results.onPlayClick = () => {
    // const gameModel = new GameModel();
    // gameModel.startState();
    Application.showWelcome();
  };
  return results.element;
};

