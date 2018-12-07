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
    this.currentDirection = 0;
    this.moblin = new Image();
    this.moblin.src = './assets/enemies.png';
    this.currentLoopIndex = 0;
    this.frameCount = 0;
    this.life = 3;
    this.scale = 2.6;
    this.speed = .6;
  }

  hitbox() {
    return {
      x: this.position[0],
      y: this.position[1],
      width: 23*this.scale,
      height: 23*this.scale,
    }
  };

  moveTowardsObject(object) {
    let dx = Math.abs(object.position[0] - this.position[0]);
    let dy = Math.abs(object.position[1] - this.position[1]);

    if (object.position[0] < this.position[0]) {
      this.position[0] -= this.speed;
      if (dx > dy) {
        this.currentDirection = 1;
      }
    }
    if (object.position[1] < this.position[1]) {
      this.position[1] -= this.speed;
      if (dy > dx) {
        this.currentDirection = 3;
      }
    }
    if (object.position[0] > this.position[0]) {
      this.position[0] += this.speed;
      if (dx > dy) {
        this.currentDirection = 0;
      }
    }
    if (object.position[1] > this.position[1]) {
      this.position[1] += this.speed;
      if (dy > dx) {
        this.currentDirection = 2;
      }
    }
  }

  move(player) {
    if (this.poofing === true) {
      return
    }
    // if (this.currentDirection === 0) {
    //   this.position[0] += this.speed;
    //   if (this.position[0] + this.width > this.canvas.width || this.position[0] < 0) {
    //     this.currentDirection = 1
    //   }
    // } else if (this.currentDirection === 1) {
    //   this.position[0] -= this.speed;
    //   if (this.position[0] + this.width > this.canvas.width || this.position[0] < 0) {
    //     this.currentDirection = 0
    //   }
    // }
    this.moveTowardsObject(player)
  }

  step() {
    if (this.poofing === true) {
      return
    }
    let allFrames = MOBLIN_SPRITES[moblin_directions[this.currentDirection]]
    let numFrames = allFrames.length;
    if (this.frameCount < 8) {
      this.drawWalkFrame(allFrames[this.currentLoopIndex])
      this.frameCount++;
      return
    }
    this.frameCount = 0;
    this.currentLoopIndex++;
    // if (this.currentLoopIndex === numFrames) {
    //   break;
    // }
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
  }

  draw() {
    this.step();
    this.poof();
  }
}

export default Moblin;
