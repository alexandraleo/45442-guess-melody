import HeaderView from '../game/header-view.js';

export const moduleHeader = (game) => {
  const welcome = new HeaderView(game);
  return welcome.element;
};

