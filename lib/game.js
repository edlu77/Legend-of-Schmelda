import Wallmaster from './wallmaster.js';
import Link from './link.js';

class Game {
  constructor(canvas, ctx) {
    this.enemies = [];
    this.link = new Link(canvas, ctx);
    this.ctx = ctx;
    this.canvas = canvas;
    this.draw = this.draw.bind(this);
    this.makeEnemy = this.makeEnemy.bind(this);
    this.loop = this.loop.bind(this);
    this.keys = [];
    this.linkHurtSound = new Audio('./assets/LTTP_Link_Hurt.wav');
    this.combineListeners();
  }


  combineListeners() {
    document.addEventListener('keydown', this.link.getMoveKeys);
    document.addEventListener('keyup', this.link.deleteMoveKeys);
    document.addEventListener('keydown', this.link.move);
    document.addEventListener('keydown', this.link.attack);
    document.addEventListener('keyup', this.link.stopWalking);
  }

  loop() {
    this.update();
    this.draw();
    window.requestAnimationFrame(this.loop)
  }

  update() {
    this.gameOver();
    this.avoidOverlap();
    this.updateEnemies();
  }

  draw() {
    this.link.draw();
    this.drawEnemies();
  }

  updateEnemies() {
    for (let i = 0; i < this.enemies.length; i++) {
      //clear any dead enemies from the state
      if (this.enemies[i].isDead()) {
        this.enemies.splice(i, 1);
      }
      if (this.enemies[i]) {
        this.enemies[i].move(this.link);
        if (this.link.collidedWith(this.enemies[i]) && this.link.invincible === false) {
          this.linkHurtSound.play();
          // this.link.recoil();
          this.link.life -= 1;
          this.link.damaged();
          console.log(this.link.life)
        }
        if (this.link.attackedObject(this.enemies[i])) {
          this.enemies[i].recoil(this.link.currentDirection);
          this.enemies[i].life -= 1
        }
      }
    }
  }

  drawEnemies() {
    for (let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].draw();
    }
  }

  makeEnemy() {
    if (this.enemies.length < 12) {
      this.enemies.push(new Wallmaster(this.canvas, this.ctx, this.enemySpawnPos()));
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
      // console.log("You have died!")
    }
  }

}

export default Game;
