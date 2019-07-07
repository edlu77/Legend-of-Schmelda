import Enemy from './enemy';
import Fire from './fire';

const ganon_directions = ["right", "left", "faceDown", "faceUp"];

const GANON_SPRITES = {
  "faceDown": [
    [16, 379, 49, 61],
    [68, 384, 64, 56],
    [139, 397, 72, 43],
    [218, 389, 64, 51],
    [286, 387, 49, 53],
    [340, 389, 59, 51],
    [404, 397, 60, 43],
    [467, 383, 56, 57],
  ],
  "faceUp": [20, 313, 45, 61],
};

class Ganon extends Enemy {
  constructor(canvas, ctx, pos) {
    super(canvas, ctx, pos);
    this.currentDirection = 2;
    this.ganon = new Image();
    this.ganon.src = './assets/gannon-2.png';
    this.life = 10;
    this.currentSprites = GANON_SPRITES["faceDown"]
    this.width = this.currentSprites[2];
    this.height = this.currentSprites[3];
    this.spawnTime = Date.now();
    this.oldTime = Date.now();
    this.invincible = false;
    this.fire = [];
    this.fireCount = 0;
    this.currentLoopIndex = 0;
    this.frameCount = 0;
  }

  hitbox() {
    return {
      x: this.position[0],
      y: this.position[1],
      width: this.width*this.scale,
      height: this.height*this.scale,
    }
  };

  recoil() {
    return
  }

  damaged(attack) {
    if (this.flashing) {
      return
    } else {
      this.flashing = true;
      this.invincible = true;
      this.life -= attack;
      setTimeout(() => {this.flashing = false; this.invincible = false}, 2000)
    }
  }

  move(player) {
    let spawnPoints = [[50, 50], [50, 200], [500, 50], [500, 200], [300, 150]]
    if (Date.now() - this.spawnTime > 3000) {
      this.position = spawnPoints[Math.floor(Math.random()*spawnPoints.length)]
      this.spawnTime = Date.now();
    }
  }

  moveAwayFromEnemy() {
    return;
  }

  attack() {
    this.spawnFire();
  }

  spawnFire() {
    if (this.fireCount === 6) {
      this.fireCount = 0;
      return;
    }
    for (let i = 0; i < this.fire.length; i++) {
      if (Date.now() - this.fire[i].spawnTime > 6000) {
        this.fire.splice(i, 1);
      }
    }

    if (Date.now() - this.oldTime > 1000) {
      let newFire = new Fire(this.canvas, this.ctx, [Math.random()*this.canvas.width, Math.random()*this.canvas.height]);
      if (newFire.collidedWith(this)) {
        this.spawnFire()
      } else {
        this.fire.push(newFire);
        this.oldTime = Date.now();
        this.fireCount++;
      }
    }
  }

  animate() {
    if (this.poofing) {
      return;
    }
    let allFrames = GANON_SPRITES["faceDown"];
    let numFrames = allFrames.length;
    if (this.frameCount < 2) {
      this.width = allFrames[2];
      this.height = allFrames[3];
      this.drawWalkFrame(allFrames[this.currentLoopIndex])
      this.frameCount++;
      return
    }
    this.frameCount = 0;
    this.currentLoopIndex++;
    if (this.currentLoopIndex >= numFrames) {
      this.currentLoopIndex = 0;
    }

    this.drawWalkFrame(allFrames[this.currentLoopIndex])
  }

  drawWalkFrame(frame) {
    this.ctx.drawImage(
      this.ganon,
      frame[0],
      frame[1],
      frame[2],
      frame[3],
      this.position[0],
      this.position[1],
      this.scale*frame[2],
      this.scale*frame[3],
    )
  }

  draw() {
    if (this.flashing) {
      this.flashFrameCount++
      if (this.flashFrameCount < 5) {
        return;
      }
      this.flashFrameCount = 0;
    }
    this.animate();
    this.poof();
  }
}

export default Ganon;
