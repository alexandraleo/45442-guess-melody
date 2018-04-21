import {getRandomArrayOrder, getRandomElement} from './utils.js';
// Music from https://www.youtube.com/audiolibrary/music?feature=blog
export const questions = [
  {
    artist: `Kevin MacLeod`,
    name: `Long Stroll`,
    image: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
    genre: `Jazz`
  },
  {
    artist: `Jingle Punks`,
    name: `In the Land of Rhinoplasty`,
    image: `https://i.vimeocdn.com/portrait/992615_300x300`,
    src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
    genre: `Rock`
  },
  {
    artist: `Audionautix`,
    name: `Travel Light`,
    image: `http://4.bp.blogspot.com/-kft9qu5ET6U/VPFUBi9W-MI/AAAAAAAACYM/UxXilXKYwOc/s1600/audionautix%2BHalf%2BSize.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`,
    genre: `Country`
  },
  {
    artist: `Riot`,
    name: `Level Plane`,
    image: `https://i.ytimg.com/vi/jzgM3m8Vp1k/maxresdefault.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=dfb828f40096184c`,
    genre: `R&B`
  },
  {
    artist: `Jingle Punks`,
    name: `Lucky Day`,
    image: `https://i.vimeocdn.com/portrait/992615_300x300`,
    src: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`,
    genre: `Pop`
  },
  {
    artist: `Gunnar Olsen`,
    name: `Home Stretch`,
    image: `https://f4.bcbits.com/img/0004181452_10.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`,
    genre: `Electronic`
  },
  {
    artist: `Audionautix`,
    name: `Travel Light`,
    image: `http://4.bp.blogspot.com/-kft9qu5ET6U/VPFUBi9W-MI/AAAAAAAACYM/UxXilXKYwOc/s1600/audionautix%2BHalf%2BSize.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`,
    genre: `Country`
  }
];

export const getRandomQuestions = (variants, quantity) => {
  const questionsArray = [...variants];
  questionsArray.sort(getRandomArrayOrder);
  const chosenQuestions = questionsArray.slice(0, quantity);
  return chosenQuestions;
};
export const getRandomArtist = (chosenQuestions) => {
  const randomQuestion = chosenQuestions[getRandomElement(0, chosenQuestions.length)];
  for (let question of chosenQuestions) {
    if (question === randomQuestion) {
      question.song = true;
    } else {
      question.song = false;
    }
  }
  return chosenQuestions;
};

export const getRandomGenre = (chosenGenreQuestions) => {
  const randomGenre = chosenGenreQuestions[getRandomElement(0, chosenGenreQuestions.length)].genre;
  return randomGenre;
};

export const genreNames = new Map([
  [`Country`, `кантри`],
  [`Electronic`, `электроник`],
  [`Pop`, `поп`],
  [`R&B`, `ритм-н-блюз`],
  [`Rock`, `рок`],
  [`Jazz`, `джаз`]
]);
