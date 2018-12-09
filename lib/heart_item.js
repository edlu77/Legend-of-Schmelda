import Item from './item';

class HeartItem extends Item {
  constructor(canvas, ctx, pos, value) {
    super(canvas, ctx, pos);
    this.heartItem = new Image();
    this.heartItem.src = './assets/items-overworld.png';
    this.width = 14;
    this.height = 13;
    this.weight = 10;
    this.scale = 2
  }

  hitbox() {
    return {
      x: this.position[0],
      y: this.position[1],
      width: this.width*this.scale,
      height: this.height*this.scale,
    }
  };

  draw() {
    if (this.flashing) {
      this.flashFrameCount++
      if (this.flashFrameCount < 5) {
        return;
      }
      this.flashFrameCount = 0;
    }
    this.ctx.drawImage(
      this.heartItem,
      273,
      58,
      this.width,
      this.height,
      this.position[0],
      this.position[1],
      this.width*this.scale,
      this.height*this.scale,
    )
  }

}

export default HeartItem;
