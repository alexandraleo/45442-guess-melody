import {showScreen} from '../show-screen.js';
import {moduleWelcome} from '../templates/template-welcome.js';
import {startState} from '../data/game.js';
import ResultsView from '../game/results-view.js';

export const moduleResult = (result) => {
  const results = new ResultsView(result);

  results.onPlayClick = () => {
    startState();
    showScreen(moduleWelcome());
  };
  return results.element;
};

