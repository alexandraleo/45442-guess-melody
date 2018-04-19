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
