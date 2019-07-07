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
    this.drawWalkFrame(allFrames[0])
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
