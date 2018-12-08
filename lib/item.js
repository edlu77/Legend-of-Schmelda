class Item {
  constructor(canvas, ctx, pos) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.position = pos;
    this.scale = 2.6;
    this.itemGetSound = new Audio('./assets/LTTP_Item.wav')
  }
}

export default Item;
