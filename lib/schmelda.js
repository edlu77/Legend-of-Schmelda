import Game from './game.js';

document.addEventListener('DOMContentLoaded', ()=> {
  const mainCanvas = document.getElementById('main-window');
  const ctx = mainCanvas.getContext('2d');
  const game = new Game(mainCanvas, ctx)
  game.draw();
  document.onkeydown = game.link.move;
});
