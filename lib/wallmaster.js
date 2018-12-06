import Enemy from './enemy';

const WALLMASTER_SPRITES = [
  [281, 883, 23, 23],
  [323, 883, 23, 23]
]

class Wallmaster extends Enemy {
  constructor(canvas, ctx, pos) {
    super(canvas, ctx, pos);
    this.wallmaster = new Image();
    this.wallmaster.src = './assets/enemies.png';
    this.currentLoopIndex = 0;
    this.walkCycle = 0;
    this.frameCount = -1;
    this.life = 3;
    this.scale = 1.5;
    this.speed = Math.random()*.8;
    this.move = this.move.bind(this);
    this.draw = this.draw.bind(this);
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
    if (object.position[0] < this.position[0]) {
      this.position[0] -= this.speed;
      this.currentDirection = 1;
    }
    if (object.position[1] < this.position[1]) {
      this.position[1] -= this.speed;
      this.currentDirection = 2;
    }
    if (object.position[0] > this.position[0]) {
      this.position[0] += this.speed;
      this.currentDirection = 0;
    }
    if (object.position[1] > this.position[1]) {
      this.position[1] += this.speed;
      this.currentDirection = 3;
    }
  }

  move(player) {
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

  getSprite() {
    if (this.walkCycle === 0) {
      return WALLMASTER_SPRITES[0]
    } else {
      return WALLMASTER_SPRITES[1]
    }
  }

  draw() {
    this.ctx.clearRect(this.position[0], this.position[1], this.width, this.height)
    if (this.frameCount < 9) {
      this.frameCount++
    } else {
      this.walkCycle = (this.walkCycle === 1 ? 0 : 1)
      this.frameCount = 0;
    }

    let sprite = this.getSprite();

    this.ctx.drawImage(
      this.wallmaster,
      sprite[0],
      sprite[1],
      sprite[2],
      sprite[3],
      this.position[0],
      this.position[1],
      this.scale*sprite[2],
      this.scale*sprite[3],
    )
  }
}

export default Wallmaster;
