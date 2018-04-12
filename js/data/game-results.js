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


// Перепишу
// export const chooseWordsEndings = (number, word) => {
//   let newWord = ``;
//   let ending = ``;
//   if (number === 1) {
//     ending = `у`;
//   }
//   if (word === `минута` || word === `секунда`) {
//     if (number >= 2 && number <= 4) {
//       ending = `ы`;
//     } else if ([0, 1, 2, 3, 4].includes(number % 5) && number > 4) {
//       ending = ``;
//     }
//     newWord = word.replace(/.$/, ending);
//     return `Вы прошли за ${number} ${newWord}`;
//   }
//   if (word === `ошибка`) {
//     if (number >= 2 && number <= 4) {
//       ending = `и`;
//     } else if ([0, 1, 2, 3, 4].includes(number % 5) && number > 4) {
//       ending = `ок`;
//       newWord = word.replace(/.{2}$/, ending);
//       return `Вы допустили ${number} ${newWord}`;
//     }
//     newWord = word.replace(/.$/, ending);
//     return `Вы допустили ${number} ${newWord}`;
//   }
//   return `${number} ${newWord}`;
// };

