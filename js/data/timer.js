export const setTimer = (workingTime) => {
  if (workingTime < 1 || typeof (workingTime) !== `number`) {
    throw new Error(`Некорректно задано время`);
  }
  const timer = {
    timeLeft: workingTime,
    tick: () => {
      if (timer.timeLeft < 1) {
        return {done: true, time: 100};
      }
      timer.timeLeft--;
      return timer.timeLeft;
    }
  };
  return timer.tick();
};
