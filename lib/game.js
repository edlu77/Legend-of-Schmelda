import Enemy from './enemy.js';
import Link from './link.js';

class Game {
  constructor(canvas, ctx) {
    this.enemies = [];
    this.link = new Link(canvas, ctx);
    this.ctx = ctx;
    this.canvas = canvas;
    this.draw = this.draw.bind(this);
    this.makeEnemy = this.makeEnemy.bind(this)
  }

  loop() {
    this.draw()
    setInterval(this.makeEnemy, 1000)
  }

  draw() {
    this.link.draw();
    this.enemies.forEach ((enemy) => {
      enemy.draw(this.link);
      if (this.link.collidedWith(enemy)) {
        // this.link.recoil(this.link.oppositeDirection);
        console.log("ouch!")
      }
      if (this.link.attackedObject(enemy)) {
        enemy.recoil(this.link.currentDirection);
        enemy.life -= 1
      }
    })

    window.requestAnimationFrame(this.draw)
  }

  makeEnemy() {
    if (this.enemies.length < 1) {
      this.enemies.push(new Enemy(this.canvas, this.ctx, [this.canvas.width+50, Math.random()*this.canvas.height], 0));
      console.log(this.enemies.length)
    }
  }

}

export default Game;
