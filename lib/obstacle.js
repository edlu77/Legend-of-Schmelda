class Obstacle {
  constructor(pos, width, height) {
    this.position = pos;
    this.width = width;
    this.height = height;
    this.scale = 2;
  }

  hitbox() {
    return {
      x: this.position[0]*this.scale,
      y: this.position[1]*this.scale,
      width: this.width*this.scale,
      height: this.height*this.scale,
    }
  };
}

export default Obstacle;
