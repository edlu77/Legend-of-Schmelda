class Enemy {
  constructor() {
    this.position = [30, 30];
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.rect(this.position[0], this.position[1], 10, 50)
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.lineWidth = 1
    ctx.strokeStyle = 'yellow';
    ctx.stroke();
  }

  move() {
    this.position[0] -= 10;
  }

  step(ctx) {
    this.draw(ctx);
    this.move()
  }
}

export default Enemy
