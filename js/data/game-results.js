const reduceScore = (initial, current) => {
  if (current.right) {
    return initial + (current.time < 30 ? 2 : 1);
  } else {
    return initial - 2;
  }
};

export const scoringGame = (answers, attemptsLeft) => {
  if (answers.length < 10 || attemptsLeft < 1) {
    return -1;
  }
  return answers.reduce(reduceScore, 0);
};

export const results = {
  victory: {
    header: `Вы настоящий меломан!`,
    stat: `За&nbsp;3&nbsp;минуты и 25&nbsp;секунд <br>вы&nbsp;набрали 12 баллов (8 быстрых)
<br>совершив 3 ошибки`,
    place: `<span class="main-comparison">Вы заняли 2 место из 10.
Это&nbsp;лучше чем у&nbsp;80%&nbsp;игроков</span>`,
    button: `Сыграть ещё раз`
  },
  time: {
    header: `Увы и ах!`,
    stat: `Время вышло!<br>Вы не успели отгадать все мелодии`,
    place: ``,
    button: `Попробовать ещё раз`
  },
  attempts: {
    header: `Какая жалость!`,
    stat: `У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!`,
    place: ``,
    button: `Попробовать ещё раз`
  }
};

export const scoringPlayers = (playersScores, playerScore) => {
  if (playerScore.attemptsLeft < 1) {
    return `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
  } else if (playerScore.timeLeft === 0) {
    return `Время вышло! Вы не успели отгадать все мелодии`;
  }

  const newScores = [...playersScores];
  newScores.push(playerScore.totalScore);
  newScores.sort((a, b) => b - a);
  const place = newScores.indexOf(playerScore.totalScore) + 1;
  const quantity = newScores.length;
  const percent = Math.floor((quantity - place) / quantity * 100);
  return `Вы заняли ${place} место из ${quantity} игроков. Это лучше, чем у ${percent}% игроков`;
};

export const chooseWordsEndings = (number, words) => {
  const cases = [2, 0, 1, 1, 1, 2];
  const wordIndex = (number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5];
  return `${number} ${words[wordIndex]}`;
};

