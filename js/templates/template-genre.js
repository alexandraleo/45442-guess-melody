import GenreView from '../game/genre-view.js';
// import Application from '../application.js';
// import {chooseGame, checkGenreAnswers} from '../data/game.js';

export const moduleGenre = (question) => {
  const genre = new GenreView(question);

  genre.onPlayClick = () => {
    checkGenreAnswers(question);
    // Application.playGame();
    chooseGame();
  };
  return genre.element;
};

