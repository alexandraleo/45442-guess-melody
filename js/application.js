import WelcomeView from './game/welcome-view.js';
import GameModel from './game/game-model.js';
import GameScreen from './game/game-screen.js';
import ResultsView from './game/results-view.js';
import Loader from './loader.js';
import SplashScreen from './utils/splash.js';
import ErrorView from './utils/error.js';

const mainSectionNode = document.querySelector(`div.app`);

export default class Application {

  static start() {
    const splash = new SplashScreen();
    this.showScreen(splash.element);
    splash.start();
    Loader.loadQuestions().
        then(Application.showWelcome).
        catch(Application.showError).
        then(() => splash.stop());
  }

  static showError(error) {
    const errorView = new ErrorView(error);
    this.showScreen(errorView);
  }

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
