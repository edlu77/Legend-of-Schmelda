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
    setInterval(this.makeEnemy, 3000)
  }

  draw() {
    this.link.draw();
    for (let i = 0; i < this.enemies.length; i++) {
      if (this.enemies[i].life === 0) {
        continue;
      }
      this.enemies[i].draw(this.link);
      if (this.link.collidedWith(this.enemies[i])) {
        this.link.recoil(this.enemies[i].currentDirection);
        console.log("ouch!")
      }
      if (this.link.attackedObject(this.enemies[i])) {
        this.enemies[i].recoil(this.link.currentDirection);
        this.enemies[i].life -= 1
      }
    }
    window.requestAnimationFrame(this.draw)
  }

  makeEnemy() {
    if (this.enemies.length < 100) {
      this.enemies.push(new Enemy(this.canvas, this.ctx, this.enemySpawnPos()));
    }
  }

  enemySpawnPos() {
    const wall = Math.floor(Math.random()*4);
    switch (wall) {
      case 0:
        return [-50, Math.random()*this.canvas.height]
      case 1:
        return [this.canvas.width+50, Math.random()*this.canvas.height]
      case 2:
        return [Math.random()*this.canvas.width, this.canvas.height+ 50]
      case 3:
        return [Math.random()*this.canvas.width, -50]
    }
  }

}

export default Game;
