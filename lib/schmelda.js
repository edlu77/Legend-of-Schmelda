import Game from './game.js';
import Info from './info.js';

document.addEventListener('DOMContentLoaded', ()=> {
  const mainCanvas = document.getElementsByClassName('game-canvas')[0];
  const infoCanvas = document.getElementsByClassName('info-canvas')[0];
  const ctx = mainCanvas.getContext('2d');
  const ctxInfo = infoCanvas.getContext('2d');


  const game = new Game(mainCanvas, ctx);
  const info = new Info(infoCanvas, ctxInfo, game)
  game.openMenu();
  info.loop();
});
