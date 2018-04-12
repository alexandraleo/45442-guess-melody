export const setTimer = (workingTime) => {
  if (workingTime < 1 || typeof (workingTime) !== `number`) {
    throw new Error(`Некорректно задано время`);
  }
  const Timer = function () {
    this.timeLeft = workingTime;
    // this.tick = function () {
    //   window.setInterval(function () {
    //     return timeLeft--;
    //   }, 1000);
    // };
    this.tick = function () {
      if (this.timeLeft < 1) {
        return `Время вышло`;
      }
      this.timeLeft--;
      return this.timeLeft;
    };
  };
  return new Timer();
};
