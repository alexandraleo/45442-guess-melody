export const setTimer = (workingTime) => {
  if (workingTime < 1 || typeof (workingTime) !== `number`) {
    throw new Error(`Некорректно задано время`);
  }
  return {
    timeLeft: workingTime,
    tick() {
      if (this.timeLeft > 0) {
        this.timeLeft -= 1;
      }
      return {done: this.timeLeft === 0, timeLeft: this.timeLeft};
    }
  };
};

export const onTimerTick = (timeRatio) => {
  const timer = document.element.querySelector(`.timer-line`);
  const radius = timer.getAttribute(`r`);
  const dasharray = Math.round(2 * Math.PI * radius);
  const dashoffset = timeRatio * dasharray;
  timer.style.strokeDasharray = dasharray;
  timer.style.strokeDashoffset = dashoffset;
};
