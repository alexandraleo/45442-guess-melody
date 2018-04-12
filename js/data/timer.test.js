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
  it(`Проверка уменьшения времени`, () => {
    assert.equal(14, setTimer(15).tick());
  });
  it(`Проверка уменьшения времени до 0`, () => {
    assert.equal(0, setTimer(1).tick());
  });
});
