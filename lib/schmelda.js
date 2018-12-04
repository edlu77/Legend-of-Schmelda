import Game from './game.js';

document.addEventListener('DOMContentLoaded', ()=> {
  const mainCanvas = document.getElementById('main-window');
  const ctx = mainCanvas.getContext('2d');

  const game = new Game(mainCanvas, ctx)
  game.loop();
  document.onkeydown = game.link.combineCallbacks;
  document.onkeyup = game.link.stopWalking;
});
