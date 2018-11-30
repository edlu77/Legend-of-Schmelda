import Enemy from './enemy';
import Background from './background'

class Game {
  constructor() {
    this.enemies = [];
    this.background = new Background();
    this.canvas = document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');
    this.enemy = new Enemy();
  }

  draw() {
    enemy.draw

  }

}

export default Game
