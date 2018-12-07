import Wallmaster from './wallmaster.js';
import Moblin from './moblin.js';
import Link from './link.js';
import Arrow from './arrow.js';

class Game {
  constructor(canvas, ctx) {
    this.enemies = [];
    this.link = new Link(canvas, ctx);
    this.ctx = ctx;
    this.canvas = canvas;
    this.draw = this.draw.bind(this);
    this.loop = this.loop.bind(this);
    this.keys = [];
    this.arrows = [];
    this.oldTime = Date.now();
    this.linkHurtSound = new Audio('./assets/LTTP_Link_Hurt.wav');
    this.arrowHitSound = new Audio('./assets/LTTP_Arrow_Hit.wav');
    this.score = 0;

    this.makeEnemy = this.makeEnemy.bind(this);
    this.makeArrow = this.makeArrow.bind(this);

    this.combineListeners();
    setInterval(this.makeEnemy, 3000)
  }


  combineListeners() {
    document.addEventListener('keydown', this.link.getMoveKeys);
    document.addEventListener('keydown', this.link.move);
    document.addEventListener('keyup', this.link.deleteMoveKeys);
    document.addEventListener('keyup', this.link.stopWalking);
    document.addEventListener('keydown', this.link.attack);
    document.addEventListener('keydown', this.link.useBow)
  }

  loop() {
    this.update();
    this.draw();
    window.requestAnimationFrame(this.loop)
  }

  update() {
    this.gameOver();
    this.updateEnemies();
    this.avoidOverlap();
    this.updateArrows();
    this.makeArrow();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.link.draw();
    this.drawEnemies();
    this.drawArrows();
  }

  makeEnemy() {
    if (this.enemies.length < 12) {
      this.enemies.push(new Moblin(this.canvas, this.ctx, this.enemySpawnPos()));
    }
  }

  updateEnemies() {
    for (let i = 0; i < this.enemies.length; i++) {
      //clear any dead enemies from the state
      if (this.enemies[i].isFullyDestroyed() === true) {
        this.enemies.splice(i, 1);
        this.score++;
        console.log(`score: ${this.score}`);
      }
      if (this.enemies[i]) {
        this.enemies[i].move(this.link);
        if (this.link.collidedWith(this.enemies[i]) && this.link.invincible === false) {
          this.linkHurtSound.play();
          // this.link.recoil();
          this.link.life -= 1;
          this.link.damaged();
          console.log(`life: ${this.link.life}`)
        }
        if (this.link.attackedObject(this.enemies[i])) {
          this.enemies[i].life -= 1;
          if (this.enemies[i].life <= 0) {
            this.enemies[i].enemyDeathSound.play();
            this.enemies[i].dead = true;
            this.enemies[i].poofing = true;
          } else {
            this.enemies[i].recoil(this.link.currentDirection);
          }
        }
        //check for arrow hits
        for (let j = 0; j < this.arrows.length; j++) {
          if (this.enemies[i].collidedWith(this.arrows[j])) {
            this.arrowHitSound.play();
            this.enemies[i].life -= 1;
            if (this.enemies[i].life <= 0) {
              this.enemies[i].enemyDeathSound.play();
              this.enemies[i].dead = true;
              this.enemies[i].poofing = true;
            } else {
              this.enemies[i].recoil(this.arrows[j].direction);
            }
            this.arrows.splice(j, 1);
          }
        }
      }
    }
  }

  drawEnemies() {
    for (let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].draw();
    }
  }

  makeArrow() {
    if (this.link.firingBow === true) {
      let startPos = this.link.position.slice(0);
      if (this.link.currentDirection === 0) {
        startPos[0] += this.link.scaledWidth;
        startPos[1] += this.link.scaledHeight/2;
      } else if (this.link.currentDirection === 1) {
        startPos[0] -= 20;
        startPos[1] = startPos[1] + this.link.scaledHeight/2;
      } else if (this.link.currentDirection === 2) {
        startPos[0] += this.link.scaledWidth/2;
        startPos[1] += this.link.scaledHeight;
      } else {
        startPos[0] += this.link.scaledWidth/2;
        startPos[1] -= 20;
      }

      if (this.arrowLimit()) {
        return
      } else {

        this.arrows.push(new Arrow(this.canvas, this.ctx, startPos, this.link.currentDirection));
        this.link.ammo -= 1;
        console.log(`ammo: ${this.link.ammo}`);
      }
    }
  }

  arrowLimit() {
    if (Date.now() - this.oldTime < 500) {
      return true
    }
    this.oldTime = Date.now();
  }

  updateArrows() {
    for (let i = 0; i < this.arrows.length; i++) {
      if (this.arrows[i].isOffscreen()) {
        this.arrows.splice(i, 1);
      }
      if (this.arrows[i]) {
        this.arrows[i].move();
      }
    }
  }

  drawArrows() {
    for (let i = 0; i < this.arrows.length; i++) {
      this.arrows[i].draw();
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
      console.log("You have died!")
    }
  }
}

export default Game;
