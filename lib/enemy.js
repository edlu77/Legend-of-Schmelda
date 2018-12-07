class Enemy {
  constructor(canvas, ctx, pos) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.position = pos;
    this.enemyDeathSound = new Audio('./assets/LTTP_Enemy_Kill.wav')
  }

  recoil(attackedSide) {
    if (attackedSide === 0) {
      this.position = [this.position[0] + 50, this.position[1]]
    } else if (attackedSide === 1) {
      this.position = [this.position[0] - 50, this.position[1]]
    } else if (attackedSide === 2) {
      this.position = [this.position[0], this.position[1] + 50]
    } else {
      this.position = [this.position[0], this.position[1] - 50]
    };
    this.ctx.fillStyle = 'red';
    this.ctx.fill();
  };

  isDead() {
    if (this.life === 0) {
      this.enemyDeathSound.play();
      return true;
    }
  };

  hitbox() {
    return {
      x: this.position[0],
      y: this.position[1],
      width: this.width,
      height: this.height,
    }
  };

  collidedWith(object) {
    let enemyHit = this.hitbox()
    let objectHit = object.hitbox()
    if (enemyHit.x < objectHit.x + objectHit.width && enemyHit.x + enemyHit.width > objectHit.x
        && enemyHit.y < objectHit.y + objectHit.height && enemyHit.y + enemyHit.height > objectHit.y) {
      return true;
    } else {
      return false;
    }
  };

  moveAwayFromObject(object) {
    if (object.position[0] < this.position[0]) {
      this.position[0] += 1;
    }
    if (object.position[1] < this.position[1]) {
      this.position[1] += 1;
    }
    if (object.position[0] > this.position[0]) {
      this.position[0] -= 1;
    }
    if (object.position[1] > this.position[1]) {
      this.position[1] -= 1;
    }
  };

};

export default Enemy;
