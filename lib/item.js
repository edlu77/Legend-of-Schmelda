class Item {
  constructor(canvas, ctx, pos) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.position = pos;
    this.scale = 2.6;
    this.itemGetSound = new Audio('./assets/LTTP_Item.wav');
    this.spawnTime = Date.now();
    this.flashing = false;

    setTimeout(() => {this.flashing = true;}, 7000)
  }

}

export default Item;
