export const getRandomArrayOrder = () => {
  return Math.random() - 0.5;
};

export const getRandomElement = (min, max) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};
