export const initialState = Object.freeze({
  attemptsLeft: 3,
  minutes: `05`,
  seconds: `00`,
  answers: []
});

export const canPlay = (game) => {
  return game.attemptsLeft - 1 >= 0 && game.answers.length + 1 <= 10;
};

export const changeStateAttempt = (game) => {
  if (!canPlay(game)) {
    throw new Error(`Попытки закончились`);
  }
  game.attemptsLeft -= 1;
  return game;
};


