import {showScreen} from './show-screen.js';
import {moduleWelcome} from './template-welcome.js';
import {startState} from './data/game.js';
import {templateHeader} from './header.js';

export let game = startState();
templateHeader(game);
showScreen(moduleWelcome());
