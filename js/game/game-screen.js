// import {moduleWelcome} from '../templates/template-welcome.js';
import {moduleHeader} from '../templates/template-header.js';
import {moduleArtists} from '../templates/template-artists.js';
import {moduleGenre} from '../templates/template-genre.js';
import {setTimer} from '../data/timer.js';
import {questions} from '../data/questions.js';
import {moduleResult} from '../templates/template-result.js';
// import Application from '../application.js';

export default class GameScreen {
  constructor(gameModel) {
    this.gameModel = gameModel;
    this.header = moduleHeader(this.gameModel.game);
    // this.artists = moduleArtists(this.gameModel.game);
    // this.genre = moduleGenre(this.gameModel.game);

    this.root = document.createElement(`template`);
    this.root.appendChild(this.header);
    console.log(this.root.appendChild(this.header));
    this.root.appendChild(this.chooseGame());
    this.timer = setTimer(this.gameModel.game.timeLeft);
    this.interval = null;
  }

  get element() {
    return this.root;
  }

  updateHeader() {
    const header = moduleHeader(this.gameModel.game);
    this.header = header;
  }

  stopGame() {
    clearInterval(this.interval);
  }

  startGame() {
    // this.interval = setInterval(() => {
    //   this.model.tick();
    //   this.timer.tick();
    //   this.updateHeader();
    // }, 1000);
  }

  chooseGame() {
    const question = questions[this.gameModel.game.answers.length];
    let view;
    if (this.gameModel.canPlay(this.gameModel.game)) {
      if (question.type === `genre`) {
        view = moduleGenre(question);
      } else if (question.type === `artist`) {
        view = moduleArtists(question);
      }
    } else {
      view = moduleResult();
    }
    return view;
  }
}
