import Wallmaster from './wallmaster.js';
import Moblin from './moblin.js';
import Link from './link.js';
import Arrow from './arrow.js';
import ArrowItem from './arrow_item.js';
import HeartItem from './heart_item.js';
import Obstacle from './obstacle.js';

class Game {
  constructor(canvas, ctx) {
    this.enemies = [];
    this.obstacles = [];
    this.link = new Link(canvas, ctx);
    this.ctx = ctx;
    this.canvas = canvas;
    this.draw = this.draw.bind(this);
    this.loop = this.loop.bind(this);
    this.keys = [];
    this.arrows = [];
    this.items = [];
    this.oldTime = Date.now();
    this.linkHurtSound = new Audio('./assets/LTTP_Link_Hurt.wav');
    this.arrowHitSound = new Audio('./assets/LTTP_Arrow_Hit.wav');
    this.score = 0;

    this.makeEnemy = this.makeEnemy.bind(this);
    this.makeArrow = this.makeArrow.bind(this);

    this.combineListeners();
    this.makeObstacles();
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
    this.handleObstacleCollisions();
    this.updateEnemies();
    this.avoidOverlap();
    this.updateArrows();
    this.makeArrow();
    this.updateItems();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.link.draw();
    this.drawEnemies();
    this.drawArrows();
    this.drawItems();
    this.drawObstacles();
  }

  makeObstacles() {
    this.obstacles.push(new Obstacle([0, 32], 25, 72));
    this.obstacles.push(new Obstacle([0, 193], 79, 48));
    this.obstacles.push(new Obstacle([0, 241], 96, 11));
    this.obstacles.push(new Obstacle([329, 29], 26, 72));
    this.obstacles.push(new Obstacle([120, 150], 60, 60));
  }

  drawObstacles() {
    for (var i = 0; i < this.obstacles.length; i++) {
      this.ctx.beginPath();
      this.ctx.rect(this.obstacles[i].hitbox().x, this.obstacles[i].hitbox().y, this.obstacles[i].hitbox().width, this.obstacles[i].hitbox().height)
      this.ctx.lineWidth = 1
      this.ctx.strokeStyle = 'yellow';
      this.ctx.stroke();
    }
  }

  handleObstacleCollisions() {
    for (let i = 0; i < this.obstacles.length; i++) {
      for (let j = 0; j < this.enemies.length; j++) {
        if (this.enemies[j].collidedWith(this.obstacles[i])) {
          this.enemies[j].moveAwayFromObject(this.obstacles[i]);
        }
      }
      if (this.link.collidedWith(this.obstacles[i])) {
        this.link.moveAwayFromObject(this.obstacles[i])
      }
    }
  }

  makeEnemy() {
    if (this.enemies.length < 12) {
      this.enemies.push(new Moblin(this.canvas, this.ctx, this.enemySpawnPos()));
    }
  }

  dropItem(position) {
    const roll = Math.random()*10;
    if (roll < 1) {
      this.items.push(new HeartItem(this.canvas, this.ctx, position, 1))
    } else if (roll >= 1 && roll < 3) {
      const amount = [1, 5, 10][Math.floor(Math.random()*3)]
      this.items.push(new ArrowItem(this.canvas, this.ctx, position, amount))
    } else {
      return
    }
  }

  updateEnemies() {
    for (let i = 0; i < this.enemies.length; i++) {
      //clear any dead enemies from the state
      if (this.enemies[i].isFullyDestroyed() === true) {
        this.dropItem(
          [this.enemies[i].position[0] + (this.enemies[i].scaledWidth/2),
            this.enemies[i].position[1] + (this.enemies[i].scaledHeight/2)]
        )
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

  drawItems() {
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].draw();
    }
  }

  updateItems() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.link.collidedWith(this.items[i])) {
        this.link.pickUpItem(this.items[i]);
        this.items.splice(i, 1);
      }
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
          this.enemies[i].moveAwayFromEnemy(this.enemies[j])
          this.enemies[j].moveAwayFromEnemy(this.enemies[i])
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
