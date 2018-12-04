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

  draw() {
    setInterval(this.makeEnemy, 3000)
    this.avoidOverlap();
    this.clearDead();
    this.gameOver();
    this.link.draw();
    for (let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].draw(this.link);
      if (this.link.collidedWith(this.enemies[i]) && this.link.invincible === false) {
        this.link.recoil(this.enemies[i].currentDirection);
        this.link.life -= 1;
        this.link.damaged();
        console.log(this.link.life)
        console.log("ouch!");
      }
      if (this.link.attackedObject(this.enemies[i])) {
        this.enemies[i].recoil(this.link.currentDirection);
        this.enemies[i].life -= 1
      }
    }
    window.requestAnimationFrame(this.draw)
  }

  makeEnemy() {
    if (this.enemies.length < 5) {
      this.enemies.push(new Enemy(this.canvas, this.ctx, this.enemySpawnPos()));
    }
  }

  clearDead() {
    for (let i = 0; i < this.enemies.length; i++) {
      if (this.enemies[i].isDead()) {
        this.enemies.splice(i, 1);
      }
    }
  };

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

  avoidOverlap() {
    for (let i = 0; i < this.enemies.length-1; i++) {
      for (let j = i+1; j < this.enemies.length; j++) {
        if (this.enemies[i].collidedWith(this.enemies[j])) {
          this.enemies[i].moveAwayFromObject(this.enemies[j])
          this.enemies[j].moveAwayFromObject(this.enemies[i])
        }
      }
    }
  }

  gameOver() {
    if (this.link.life === 0) {
      console.log("You have died!")
    }
  }

}

export default Game;
