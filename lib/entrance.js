import Obstacle from './obstacle.js';

class Entrance extends Obstacle {

  constructor(pos, ctx) {
    super(pos, ctx);
    this.ctx = ctx;
    this.pos = pos;
    this.scale = 2;
    this.entranceSprite = new Image();
    this.entranceSprite.src = './assets/tiles-overworld.png';
  }

  hitbox() {
    return {
      x: this.pos[0],
      y: this.pos[1],
      width: 30*this.scale,
      height: 30*this.scale,
    }
  };

  draw() {
    this.ctx.drawImage(
      this.entranceSprite,
      151,
      124,
      30,
      30,
      this.pos[0],
      this.pos[1],
      this.scale*30,
      this.scale*30,
    )
  }
}

export default Entrance;
