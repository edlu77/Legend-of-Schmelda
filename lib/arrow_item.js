import Item from './item';

const ARROW_ITEM_SPRITES = {
  1: [192, 8, 16, 16],
  5: [235, 8, 16, 16],
  10: [259, 8, 16, 16],
}

class ArrowItem extends Item {
  constructor(canvas, ctx, pos, value) {
    super(canvas, ctx, pos);
    this.arrowItem = new Image();
    this.arrowItem.src = './assets/items-overworld.png';
    this.value = value;
    this.width = 16;
    this.height = 16;
    this.weight = 10;
  }

  hitbox() {
    return {
      x: this.position[0],
      y: this.position[1],
      width: this.width*this.scale,
      height: this.height*this.scale,
    }
  };

  getSprite(){
    return ARROW_ITEM_SPRITES[this.value]
  }

  draw() {
    const sprite = this.getSprite();
    this.ctx.drawImage(
      this.arrowItem,
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

export default ArrowItem;
