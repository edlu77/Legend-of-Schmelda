import Game from './game.js';

document.addEventListener('DOMContentLoaded', ()=> {
  const mainCanvas = document.getElementsByClassName('game-window')[0];
  const ctx = mainCanvas.getContext('2d');

  const game = new Game(mainCanvas, ctx)
  game.openMenu();
  // game.startGame();
});
