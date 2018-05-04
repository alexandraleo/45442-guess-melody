import GenreView from '../game/genre-view.js';
import Application from '../application.js';
// import {chooseGame, checkGenreAnswers} from '../data/game.js';

export const moduleGenre = (question, gameModel, gameScreen) => {
  const genre = new GenreView(question);

  genre.onPlayClick = () => {
    gameModel.checkGenreAnswers(question);
    // Application.playGame();
    console.log(gameModel.game);
    gameScreen.chooseGame();
  };
  return genre.element;
};

