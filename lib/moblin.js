import Enemy from './enemy';

const moblin_directions = ["walkRight", "walkLeft", "walkDown", "walkUp"];

const MOBLIN_SPRITES = {
  "walkRight": [
    [160, 0, 24, 26],
    [160, 40, 24, 26],
    // [160, 80, 24, 26],
  ],
  "walkLeft": [
    [222, 14, 24, 26],
    [222, 54, 24, 26],
    // [222, 94, 24, 26],
  ],
  "walkDown": [
    [124, 0, 17, 32],
    [124, 38, 17, 32],
    // [123, 81, 17, 32],
  ],
  "walkUp": [
    [203, 0, 18, 28],
    [203, 40, 18, 28],
    // [203, 80, 18, 30],
  ],
};

class Moblin extends Enemy {
  constructor(canvas, ctx, pos) {
    super(canvas, ctx, pos);
    this.currentDirection = 2;
    this.moblin = new Image();
    this.moblin.src = './assets/enemies.png';
    this.currentLoopIndex = 0;
    this.frameCount = 0;
    this.life = 2;
    this.speed = .4;
    this.width = 17;
    this.height = 26;
    this.scaledWidth = this.width*this.scale;
    this.scaledHeight = this.height*this.scale;
  }

  hitbox() {
    if (this.currentDirection === 2) {
      this.width = 17;
      this.height = 32;
    } else if (this.currentDirection === 3) {
      this.width = 18;
      this.height = 28;
    } else{
      this.width = 17;
      this.height = 26;
    }
    this.scaledWidth = this.width*this.scale;
    this.scaledHeight = this.height*this.scale;
    const offset = [0, 7, 0, 0]
    return {
      x: this.position[0] + offset[this.currentDirection]*this.scale,
      y: this.position[1],
      width: this.scaledWidth,
      height: this.scaledHeight,
    }
  };

  move(player) {
    this.moveTowardsObject(player)
  }

  step() {
    if (this.poofing) {
      return
    }
    let allFrames = MOBLIN_SPRITES[moblin_directions[this.currentDirection]]
    let numFrames = allFrames.length;
    if (this.frameCount < 8) {
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
      this.moblin,
      frame[0],
      frame[1],
      frame[2],
      frame[3],
      this.position[0],
      this.position[1],
      this.scale*frame[2],
      this.scale*frame[3],
    )

    // const offset = [0, 7, 0, 0]
    // this.ctx.beginPath();
    // this.ctx.rect(this.position[0] + offset[this.currentDirection]*this.scale, this.position[1], this.scaledWidth, this.scaledHeight)
    // this.ctx.lineWidth = 1
    // this.ctx.strokeStyle = 'yellow';
    // this.ctx.stroke();
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

export default Moblin;
