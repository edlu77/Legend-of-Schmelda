import Enemy from './enemy';

const ganon_directions = ["right", "left", "faceDown", "faceUp"];

const GANON_SPRITES = {
  "faceDown": [16, 379, 49, 61],
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
    this.scaledWidth = this.width*this.scale;
    this.scaledHeight = this.height*this.scale;
    this.oldTime = Date.now();
    this.invincible = false;
  }

  hitbox() {
    return {
      x: this.position[0],
      y: this.position[1],
      width: this.scaledWidth,
      height: this.scaledHeight,
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
    if (Date.now() - this.oldTime > 3000) {
      this.position = spawnPoints[Math.floor(Math.random()*spawnPoints.length)]
      this.oldTime = Date.now();
    }
  }

  attack() {

  }

  step() {
    if (this.poofing) {
      return
    }
    let allFrames = GANON_SPRITES["faceDown"]
    let numFrames = allFrames.length;
    this.drawWalkFrame(allFrames)
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
    this.step();
    this.poof();
  }
}

export default Ganon;
