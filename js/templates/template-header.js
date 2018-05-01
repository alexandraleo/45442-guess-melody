import HeaderView from '../game/header-view.js';

export const moduleHeader = (game, timeRatio = 0.8) => {
  const header = new HeaderView(game);
  header.onTimerTick(timeRatio);
  return header.element;
};

