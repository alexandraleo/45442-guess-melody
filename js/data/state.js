const initialState = Object.freeze({
  attemptsLeft: 3,
  minutes: `05`,
  seconds: `00`
});
// console.log(`'initialState: '`, initialState);

export let game;
const startState = () => {
  game = Object.assign({}, initialState);
};
startState();
// console.log(game);

