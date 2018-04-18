import {assert} from 'chai';
import {setTimer} from './timer.js';

describe(`Проверка таймера`, () => {
  it(`Некорректно задано время`, () => {
    assert.throws(() => setTimer(0), `Некорректно задано время`);
  });
  it(`Некорректно задано время - строка`, () => {
    assert.throws(() => setTimer(`0`), `Некорректно задано время`);
  });
  it(`Некорректно задано время - объект`, () => {
    assert.throws(() => setTimer([]), `Некорректно задано время`);
  });
  it(`Проверка tick`, () => {
    assert.deepEqual({done: false, timeLeft: 19}, setTimer(20).tick());
  });
  it(`Проверка tick 0`, () => {
    assert.deepEqual({done: true, timeLeft: 0}, setTimer(1).tick());
  });
  it(`Проверка уменьшения времени`, () => {
    assert.equal(14, setTimer(15).tick().timeLeft);
  });
  it(`Проверка уменьшения времени до 0`, () => {
    assert.equal(0, setTimer(1).tick().timeLeft);
  });

  const timerCheck = (time, ticks) => {
    const timer = setTimer(time);
    for (let i = 0; i < ticks; i++) {
      timer.tick();
    }
    return timer.timeLeft;
  };

  it(`Проверка тиканья в цикле`, () => {
    assert.equal(5, timerCheck(10, 5));
  });
  it(`Проверка тиканья в цикле`, () => {
    assert.equal(12, timerCheck(17, 5));
  });
  it(`Проверка слишком много тиков`, () => {
    assert.equal(0, timerCheck(10, 15));
  });
});
