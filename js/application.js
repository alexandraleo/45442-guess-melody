import WelcomeView from './game/welcome-view.js';
import GameModel from './game/game-model.js';
import GameScreen from './game/game-screen.js';
import ResultsView from './game/results-view.js';

const mainSectionNode = document.querySelector(`div.app`);

export default class Application {

  static showScreen(module) {
    mainSectionNode.innerHTML = ``;
    mainSectionNode.appendChild(module);
  }

  static showWelcome() {
    const welcome = new WelcomeView();
    this.showScreen(welcome.element);
  }

  static playGame() {
    const gameModel = new GameModel();
    const gameScreen = new GameScreen(gameModel);
    this.showScreen(gameScreen.element);
    gameScreen.startGame();
  }

  static showGameOver(result) {
    const gameOver = new ResultsView(result);
    this.showScreen(gameOver.element);
  }
}
