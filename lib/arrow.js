const ARROW_SPRITES = [
  [194, 354, 15, 5],
  [194, 354, 15, 5],
  [401, 104, 5, 15],
  [395, 344, 5, 15],
] //left(invert), right, down, up

class Arrow {
  constructor(canvas, ctx, pos, direction) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.position = pos;
    this.scale = 1;
    this.arrow = new Image();
    this.arrow.src = './assets/link-2.gif';
    this.direction = direction;
    this.move = this.move.bind(this);
    this.draw = this.draw.bind(this);
    this.width = (this.direction === 0 || this.direction === 1) ? 15 : 5;
    this.height = (this.direction === 1 || this.direction === 0) ? 5 : 15;
  }

  hitbox() {
    return {
      x: this.position[0],
      y: this.position[1],
      width: this.width,
      height: this.height,
    }
  };

  collidedWith(object) {
    let enemyHit = this.hitbox()
    let objectHit = object.hitbox()
    if (enemyHit.x < objectHit.x + objectHit.width && enemyHit.x + enemyHit.width > objectHit.x
        && enemyHit.y < objectHit.y + objectHit.height && enemyHit.y + enemyHit.height > objectHit.y) {
      return true;
    } else {
      return false;
    }
  };

  getSprite() {
    return ARROW_SPRITES[this.direction]
  }

  move() {
    if (this.direction === 0) {
      this.position[0] += 10;
    } else if (this.direction === 1) {
      this.position[0] -= 10;
    } else if (this.direction === 2) {
      this.position[1] += 10;
    } else {
      this.position[1] -= 10;
    }
  }

  draw() {
    let sprite = this.getSprite();
    this.ctx.clearRect(this.position[0], this.position[1], this.width, this.height)
    this.ctx.drawImage(
      this.arrow,
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

  isOffscreen() {
    if (
      this.position[0] > this.canvas.width ||
      this.position[0] + this.width < 0 ||
      this.position[1] + this.height < 0 ||
      this.position[1] > this.canvas.height) {
      return true
    } else {
      return false
    }
  }
}

export default Arrow;
