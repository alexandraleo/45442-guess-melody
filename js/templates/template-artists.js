import ArtistsView from '../game/artists-view.js';
// import {chooseGame, checkArtistsAnswers} from '../data/game.js';


export const moduleArtists = (question) => {
  const artists = new ArtistsView(question);

  artists.onPlayClick = () => {
    // checkArtistsAnswers(evt, question);
    // chooseGame();
  };
  return artists.element;
};

