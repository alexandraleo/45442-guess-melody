import {moduleWelcome} from './templates/template-welcome.js';
import GameModel from './game/game-model.js';
import GameScreen from './game/game-screen.js';
import {moduleResult} from './templates/template-result.js';

const mainSectionNode = document.querySelector(`section.main`);

export default class Application {

  static showScreen(...modules) {
    mainSectionNode.innerHTML = ``;
    for (let module of modules) {
      mainSectionNode.appendChild(module);
    }
  }

  static showWelcome() {
    this.showScreen(moduleWelcome());
  }

  static playGame() {
    const gameModel = new GameModel();
    const gameScreen = new GameScreen(gameModel);
    console.log(this.showScreen(gameScreen.header));
    this.showScreen(gameScreen.header, gameScreen.chooseGame());
    // this.showScreen(gameScreen.chooseGame());

    gameScreen.startGame();
  }

  static showGameOver(result) {
    this.showScreen(moduleResult(result));
  }
}
