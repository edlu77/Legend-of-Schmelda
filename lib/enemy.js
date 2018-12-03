class Enemy {
  constructor(canvas, ctx) {
    this.position = [300, 300];
    this.ctx = ctx
    this.width = 50;
    this.height = 50;
    this.move = this.move.bind(this)
    this.draw = this.draw.bind(this)
    this.canvas = canvas;
    this.life = 3;
    this.speed = 2;
  }

  recoil() {
    // this.position = [this.position[0] + 50, this.position[1] + 50]
    this.ctx.fillStyle = 'red';
    this.ctx.fill();
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.rect(this.position[0], this.position[1], this.width, this.height)
    this.ctx.fillStyle = 'black';
    this.ctx.fill();
    this.ctx.lineWidth = 1
    this.ctx.strokeStyle = 'yellow';
    this.ctx.stroke();
    this.move()
  }

  move() {
    this.position[0] += this.speed;
    if (this.position[0] + this.width > this.canvas.width || this.position[0] < 0) {
      this.speed = this.speed*-1
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
