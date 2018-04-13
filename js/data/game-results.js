export const scoringGame = (answers, attemptsLeft) => {
  let totalScore = 0;
  if (answers.length < 10 || attemptsLeft < 1) {
    return -1;
  }
  answers.forEach((answer) => {
    if (answer.right) {
      let plusScore = answer.time < 30 ? 2 : 1;
      totalScore += plusScore;
    } else {
      totalScore -= 2;
    }
  });
  return totalScore;
};

export const scoringPlayers = (playersScores, playerScore) => {
  if (playerScore.attemptsLeft < 1) {
    return `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
  } else if (playerScore.timeLeft === 0) {
    return `Время вышло! Вы не успели отгадать все мелодии`;
  }

  const newScores = playersScores.slice();
  newScores.push(playerScore.totalScore);
  newScores.sort((a, b) => b - a);
  const place = newScores.indexOf(playerScore.totalScore) + 1;
  const quantity = newScores.length;
  const percent = Math.floor((quantity - place) / quantity * 100);
  return `Вы заняли ${place} место из ${quantity} игроков. Это лучше, чем у ${percent}% игроков`;
};

export const chooseWordsEndings = (number, words) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return `${number} ${words[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]]}`;
};

