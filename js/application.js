import WelcomeView from './game/welcome-view.js';
import GameModel from './game/game-model.js';
import GameScreen from './game/game-screen.js';
import ResultsView from './game/results-view.js';
import Loader from './loader.js';
// import SplashScreen from './utils/splash.js';
import ErrorView from './utils/error.js';

const mainSectionNode = document.querySelector(`div.app`);
let questions;

export default class Application {

  static showScreen(module) {
    mainSectionNode.innerHTML = ``;
    mainSectionNode.appendChild(module);
  }

  static start() {
    // const start = Application.showWelcome();
    // start.disableBtn();
    Loader.loadQuestions().
        then(Application.showWelcome()).
        then(Application.readyToStart).
        catch(Application.showError);
  }

  static showError(error) {
    const errorModule = new ErrorView(error);
    this.showScreen(errorModule.element);
  }

  static showWelcome() {
    const welcome = new WelcomeView();
    this.showScreen(welcome.element);
  }

  static playGame() {
    const gameModel = new GameModel(questions);
    const gameScreen = new GameScreen(gameModel, questions);
    this.showScreen(gameScreen.element);
    gameScreen.startGame();
  }

  static showGameOver(result) {
    const gameOver = new ResultsView(result);
    this.showScreen(gameOver.element);
  }

  static readyToStart(data) {
    questions = data;
  }

}
