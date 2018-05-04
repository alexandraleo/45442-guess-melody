// import {moduleWelcome} from '../templates/template-welcome.js';
// import {moduleHeader} from '../templates/template-header.js';
import {moduleArtists} from '../templates/template-artists.js';
import {moduleGenre} from '../templates/template-genre.js';
import {setTimer, onTimerTick} from '../data/timer.js';
import {questions} from '../data/questions.js';
import {moduleResult} from '../templates/template-result.js';
import HeaderView from './header-view.js';
// import Application from '../application.js';

export default class GameScreen {
  constructor(gameModel) {
    this.gameModel = gameModel;
    this.header = new HeaderView(this.gameModel.game).element;
    // this.artists = moduleArtists(this.gameModel.game);
    // this.genre = moduleGenre(this.gameModel.game);

    this.root = document.createElement(`section`);
    this.root.classList.add(`main`);
    this.root.appendChild(this.header);
    console.log(this.header);
    this.root.appendChild(this.chooseGame());
    console.log(this.element.childNodes);

    this.timer = setTimer(this.gameModel.game.timeLeft);
    // this.timeLine = onTimerTick(this.gameModel.getTimeRatio());
    this.interval = null;
  }

  get element() {
    return this.root;
  }

  updateHeader() {
    const newHeader = new HeaderView(this.gameModel.game).element;
    this.root.replaceChild(newHeader, this.header);
    this.header = newHeader;
  }

  stopGame() {
    clearInterval(this.interval);
  }

  startGame() {
    this.interval = setInterval(() => {
      this.gameModel.tick();
      this.timer.tick();
      // this.timeLine();
      this.gameModel.getTimeRatio();
      // console.log(`this.gameModel.getTimeRatio();: `, this.gameModel.getTimeRatio());
      // console.log(this.gameModel.game.minutes, this.gameModel.game.seconds);
      // this.updateHeader();
    }, 1000);
  }

  chooseGame() {
    const question = questions[this.gameModel.game.answers.length];
    let view;
    if (this.gameModel.canPlay(this.gameModel.game)) {
      if (question.type === `genre`) {
        view = moduleGenre(question, this.gameModel, this.chooseGame);
      } else if (question.type === `artist`) {
        view = moduleArtists(question, this.gameModel, this.chooseGame);
      }
    } else {
      view = moduleResult();
    }
    return view;
  }
}
