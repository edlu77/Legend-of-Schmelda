import Enemy from './enemy.js';
import Link from './link.js';

class Game {
  constructor(canvas, ctx) {
    this.enemy = new Enemy();
    this.link = new Link(canvas, ctx);
    this.ctx = ctx;
    this.canvas = canvas;
    this.draw = this.draw.bind(this)
  }

  draw() {
    // this.enemy.draw(this.ctx)
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.beginPath();
    this.ctx.lineWidth="6";
    this.ctx.strokeStyle="red";
    this.ctx.rect(5,5,290,140);
    this.ctx.stroke();
    this.link.draw();
  }

}

export default Game;
