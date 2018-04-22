export const initialState = Object.freeze({
  attemptsLeft: 3,
  minutes: `05`,
  seconds: `00`
});

export const canPlay = (game) => game.attemptsLeft - 1 > 0;
export const changeStateAttempt = (game) => {
  if (!canPlay(game)) {
    throw new Error(`Попытки закончились`);
  }
  game.attemptsLeft -= 1;
  return game;
};


