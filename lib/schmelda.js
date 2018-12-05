import Game from './game.js';

document.addEventListener('DOMContentLoaded', ()=> {
  const mainCanvas = document.getElementById('main-window');
  const ctx = mainCanvas.getContext('2d');

  const game = new Game(mainCanvas, ctx)
  setInterval(game.makeEnemy, 3000)
  game.loop();

  // let keys = [];
  // document.addEventListener('keydown', function (e) {
  //   keys = (keys || []);
  //   keys[e.keyCode] = true;
  // })
  // document.addEventListener('keyup', function (e) {
  //   keys[e.keyCode] = false;
  // })
});
