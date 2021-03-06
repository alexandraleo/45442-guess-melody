export const scoringGame = (answers, attemptsLeft) => {
  if (answers.length < 10 || attemptsLeft < 1) {
    return -1;
  }
  return answers.reduce(reduceScore, 0);
};

export const scoringPlayers = (playersScores, playerScore) => {
  if (playerScore.attemptsLeft < 1) {
    return `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
  } else if (playerScore.timeLeft === 0) {
    return `Время вышло! Вы не успели отгадать все мелодии`;
  }

  const newScores = [...playersScores];
  newScores.push(playerScore);
  newScores.sort((a, b) => b - a);
  const place = newScores.indexOf(playerScore) + 1;
  const quantity = newScores.length;
  const percent = Math.floor((quantity - place) / quantity * 100);
  return `Вы заняли ${place} место из ${quantity} игроков. Это лучше, чем у ${percent}% игроков`;
};

export const chooseWordsEndings = (number, words) => {
  const cases = [2, 0, 1, 1, 1, 2];
  const wordIndex = (number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5];
  return `${number} ${words[wordIndex]}`;
};

const reduceScore = (initial, current) => {
  if (current.right) {
    return initial + (current.time < 30 ? 2 : 1);
  } else {
    return initial - 2;
  }
};
const reduceTime = (initial, current) => {
  if (current.right && current.time < 30) {
    return initial + 1;
  } else {
    return initial;
  }
};
export const scoringFast = (answers) => {
  return answers.reduce(reduceTime, 0);
};

