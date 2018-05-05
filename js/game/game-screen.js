import GenreView from './genre-view.js';
import ArtistsView from './artists-view.js';
import HeaderView from './header-view.js';
import {setTimer} from '../data/timer.js';
// import {questions} from '../data/questions.js';
import Application from '../application.js';

export default class GameScreen {
  constructor(gameModel, questions) {
    this.questions = questions;
    this.gameModel = gameModel;
    this.header = new HeaderView(this.gameModel.game);
    this.newGame = this.chooseGame();

    this.root = document.createElement(`section`);
    this.root.classList.add(`main`, `main--level`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.newGame.element);

    this.timer = setTimer(this.gameModel.game.timeLeft);
    this.interval = null;
  }

  get element() {
    return this.root;
  }

  stopGame() {
    clearInterval(this.interval);
  }

  startGame() {
    this.interval = setInterval(() => {
      this.gameModel.tick();
      this.timer.tick();
      if (this.gameModel.canPlay) {
        this.updateHeader();
      } else {
        this.showGameOver();
      }
    }, 1000);
  }

  updateHeader() {
    const newHeader = new HeaderView(this.gameModel.game);
    this.root.replaceChild(newHeader.element, this.root.firstChild);
    this.header = newHeader;
  }

  updateGame() {
    const nextGame = this.chooseGame();
    this.root.replaceChild(nextGame.element, this.root.lastChild);
    this.newGame = nextGame;
  }

  showGameOver() {
    this.stopGame();
    Application.showGameOver(this.gameModel.gameOver());
  }

  get answerTime() {
    return this.gameModel.game.answerTime - this.gameModel.game.timeLeft;
  }

  chooseGame() {
    const question = this.questions[this.gameModel.game.answers.length];
    this.gameModel.game.answerTime = this.gameModel.game.timeLeft;
    let view;
    let timer;
    if (this.gameModel.canPlay) {
      if (question.type === `genre`) {
        view = new GenreView(question);
        view.onPlayClick = () => {
          timer = this.answerTime;
          this.gameModel.checkGenreAnswers(question, timer);
          this.updateGame();
        };
      } else if (question.type === `artist`) {
        view = new ArtistsView(question);
        view.onPlayClick = (evt) => {
          timer = this.answerTime;
          this.gameModel.checkArtistsAnswers(evt, question, timer);
          this.updateGame();
        };
      }
    }
    return view;
  }
}
