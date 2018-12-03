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
    if (this.enemy.isAlive()) {
      this.enemy.draw();
      this.link.draw();
      if (this.link.collidedWith(this.enemy)) {
        // this.link.recoil();
        console.log("ouch!")
      }
      if (this.link.attackedObject(this.enemy)) {
        this.enemy.recoil(this.link.currentDirection);
        this.enemy.life -= 1
      }
    } else {
      this.link.draw();
    }

    window.requestAnimationFrame(this.draw)
  }

  makeEnemy() {
    this.enemies.push(new Enemy(this.canvas, this.ctx));

  }

}

export default Game;
