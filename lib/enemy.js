class Enemy {
  constructor(canvas, ctx) {
    this.position = [500, 50];
    this.ctx = ctx
    this.width = 50;
    this.height = 50;
    this.move = this.move.bind(this)
    this.draw = this.draw.bind(this)
    this.canvas = canvas;
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
    // window.requestAnimationFrame(this.draw)
  }

  move() {
    this.position[0] -= 2;

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
