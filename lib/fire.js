import Enemy from './enemy';

const FIRE_SPRITES = [
  [504, 22, 16, 16],
  [523, 22, 16, 16],
];

class Fire extends Enemy {
  constructor(canvas, ctx, pos) {
    super(canvas, ctx, pos);
    this.fire = new Image();
    this.fire.src = './assets/gannon-2.png';
    this.life = 1;
    this.oldTime = Date.now();
    this.invincible = true;
    this.width = 16;
    this.height = 16;
    this.scaledWidth = this.width*this.scale;
    this.scaledHeight = this.height*this.scale;
    this.despawned = false;
    this.spawnTime = Date.now();
    this.currentLoopIndex = 0;
    this.frameCount = 0;
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

  damaged() {
    return
  }

  move() {
    return;
  }

  moveAwayFromEnemy() {
    return;
  }

  step() {
    let allFrames = FIRE_SPRITES;
    let numFrames = allFrames.length;
    if (this.frameCount < 4) {
      this.width = allFrames[this.currentLoopIndex][2];
      this.height = allFrames[this.currentLoopIndex][3];
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
      this.fire,
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
    this.step();
  }

}

export default Fire;
