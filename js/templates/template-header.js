import HeaderView from '../game/header-view.js';

export const moduleHeader = (game) => {
  const header = new HeaderView(game);
  // header.onTimerTick(timeRatio);
  return header.element;
};

