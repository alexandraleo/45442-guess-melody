import AbstractView from '../abstract-view.js';

export default class HeaderView extends AbstractView {
  constructor(game) {
    super();
    this.game = game;
  }

  get time() {
    let minutes = Math.floor(this.game.timeLeft / 60);
    if (minutes < 10) {
      minutes = `0` + minutes;
    }
    let seconds = this.game.timeLeft % 60;
    if (seconds < 10) {
      seconds = `0` + seconds;
    }
    return {minutes, seconds};
  }

  get template() {
    return `<div><svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle
        cx="390" cy="390" r="370"
        class="timer-line"
        style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>

      <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
        <span class="timer-value-mins">${this.time.minutes}</span><!--
          --><span class="timer-value-dots">:</span><!--
          --><span class="timer-value-secs">${this.time.seconds}</span>
      </div>
    </svg>
    <div class= "main-mistakes" >
      ${new Array(3 - this.game.attemptsLeft)
      .fill(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`)
      .join(``)}
    </div></div>`;
  }

  timeLine(radius, timeLeft) {
    const dasharray = Math.round(2 * Math.PI * radius);
    const timeRatio = Math.round((1 - timeLeft / this.game.totalSeconds) * 1000) / 1000;
    const dashoffset = timeRatio * dasharray;
    return {dasharray, dashoffset};
  }

  bind() {
    const timer = this.element.querySelector(`.timer-line`);
    const radius = timer.getAttribute(`r`);
    const timerStroke = this.timeLine(radius, this.game.timeLeft);
    timer.style.strokeDasharray = timerStroke.dasharray;
    timer.style.strokeDashoffset = timerStroke.dashoffset;
  }
}

