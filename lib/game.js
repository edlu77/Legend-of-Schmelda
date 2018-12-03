import Enemy from './enemy.js';
import Link from './link.js';

class Game {
  constructor(canvas, ctx) {
    this.enemy = new Enemy(canvas, ctx);
    this.enemies = [];
    this.link = new Link(canvas, ctx);
    this.ctx = ctx;
    this.canvas = canvas;
    this.draw = this.draw.bind(this);
  }

  draw() {
    // this.enemy.draw();
    this.link.draw();
    if (this.link.collidedWith(this.enemy)) {
      console.log("ouch!")
    }
    window.requestAnimationFrame(this.draw)
  }

  makeEnemy() {
    this.enemies.push(new Enemy(this.canvas, this.ctx));

  }

}

export default Game;
