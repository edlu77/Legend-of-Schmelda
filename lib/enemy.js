class Enemy {
  constructor(canvas, ctx, pos, dir_idx) {
    this.position = pos;
    this.ctx = ctx
    this.width = 30;
    this.height = 30;
    this.move = this.move.bind(this)
    this.draw = this.draw.bind(this)
    this.canvas = canvas;
    this.life = 3;
    this.speed = 1;
    this.destroyed = false;
    this.currentDirection = dir_idx;
    this.entered = false;
  }

  recoil(attackedSide) {
    this.ctx.fillStyle = 'red';
    this.ctx.fill();
    if (attackedSide === 0) {
      this.position = [this.position[0] + 50, this.position[1]]
    } else if (attackedSide === 1) {
      this.position = [this.position[0] - 50, this.position[1]]
    } else if (attackedSide === 2) {
      this.position = [this.position[0], this.position[1] + 50]
    } else {
      this.position = [this.position[0], this.position[1] - 50]
    }
  }

  isAlive() {
    if (this.life === 0) {
      return false
    } else {
      return true
    }
  }

  draw(player) {
    this.ctx.clearRect(this.position[0]-2, this.position[1]-2, this.width+4, this.height+4)

    this.ctx.beginPath();
    this.ctx.rect(this.position[0], this.position[1], this.width, this.height)
    this.ctx.fillStyle = 'black';
    this.ctx.fill();
    this.ctx.lineWidth = 1
    this.ctx.strokeStyle = 'yellow';
    this.ctx.stroke();
    this.move(player)
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

  moveTowardsObject(object) {
    if (object.position[0] < this.position[0]) {
      this.position[0] -= this.speed
    }
    if (object.position[1] < this.position[1]) {
      this.position[1] -= this.speed
    }
    if (object.position[0] > this.position[0]) {
      this.position[0] += this.speed
    }
    if (object.position[1] > this.position[1]) {
      this.position[1] += this.speed
    }


  }

  hitbox() {
    return {
      x: this.position[0],
      y: this.position[1],
      width: this.width,
      height: this.height,
    }
  };

}

export default Enemy
