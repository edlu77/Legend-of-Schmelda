const DEATH_POOF = [
  [79, 4, 24, 24],
  [105, 4, 24, 24],
  [131, 3, 24, 24],
  [157, 4, 24, 24]
]

class Enemy {
  constructor(canvas, ctx, pos) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.position = pos;
    this.scale = 2.6;
    this.enemyDeathSound = new Audio('./assets/LTTP_Enemy_Kill.wav')
    this.poofCurrentLoopIndex = 0;
    this.poofFrameCount = 0;
    this.deathPoof = new Image;
    this.deathPoof.src = './assets/death-effects.png';
    this.dead = false;
    this.poofing = false;
    this.flashing = false;
    this.stunned = false;
  }

  recoil(attackedSide) {
    if (attackedSide === 0) {
      this.position = [this.position[0] + 75, this.position[1]]
    } else if (attackedSide === 1) {
      this.position = [this.position[0] - 75, this.position[1]]
    } else if (attackedSide === 2) {
      this.position = [this.position[0], this.position[1] + 75]
    } else {
      this.position = [this.position[0], this.position[1] - 75]
    }
  };

  damaged(attack) {
    this.flashing = true;
    this.stunned = true;
    this.life -= attack;
    setTimeout(() => {this.flashing = false; this.stunned = false}, 2000)
  }

  drawDeathPoof(frame) {
    this.ctx.drawImage(
      this.deathPoof,
      frame[0],
      frame[1],
      frame[2],
      frame[3],
      this.position[0],
      this.position[1],
      frame[2]*this.scale,
      frame[3]*this.scale,
    )
  }

  poof() {
    if (this.poofing) {
      this.flashing = false;
      let currentFrame = DEATH_POOF[this.poofCurrentLoopIndex]
      let numFrames = 4;
      if (this.poofFrameCount < 5) {
        this.drawDeathPoof(currentFrame),
        this.poofFrameCount++;
        return;
      }
      this.poofFrameCount = 0;
      this.poofCurrentLoopIndex++;
      if (this.poofCurrentLoopIndex >= numFrames) {
        this.poofing = false;
        this.poofCurrentLoopIndex = 0
        return
      }
      this.drawDeathPoof(currentFrame)
    }
  }


  isFullyDestroyed() {
    if (this.poofing) {
      return false;
    } else if (this.dead) {
      return true;
    } else {
      return false;
    }
  };

  hitbox() {
    return {
      x: this.position[0],
      y: this.position[1],
      width: this.width*this.scale,
      height: this.height*this.scale,
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

  moveTowardsObject(object) {
    if (this.poofing || this.stunned) {
      return
    }
    let dx = Math.abs(object.position[0] - this.position[0]);
    let dy = Math.abs(object.position[1] - this.position[1]);

    if (object.position[0] < this.position[0]) {
      this.position[0] -= this.speed;
      if (dx > dy) {
        this.currentDirection = 1;
      }
    }
    if (object.position[1] < this.position[1]) {
      this.position[1] -= this.speed;
      if (dy > dx) {
        this.currentDirection = 3;
      }
    }
    if (object.position[0] > this.position[0]) {
      this.position[0] += this.speed;
      if (dx > dy) {
        this.currentDirection = 0;
      }
    }
    if (object.position[1] > this.position[1]) {
      this.position[1] += this.speed;
      if (dy > dx) {
        this.currentDirection = 2;
      }
    }
  }

  moveAwayFromEnemy(enemy) {
    if (this.poofing || this.stunned) {
      return
    }
    if (enemy.position[0] < this.position[0]) {
      this.position[0] += 1;
    }
    if (enemy.position[1] < this.position[1]) {
      this.position[1] += 1;
    }
    if (enemy.position[0] > this.position[0]) {
      this.position[0] -= 1;
    }
    if (enemy.position[1] > this.position[1]) {
      this.position[1] -= 1;
    }
  }

  moveAwayFromObject(object) {
    const enemyHit = this.hitbox()
    const objectHit = object.hitbox()

    const linkBottom = enemyHit.y + enemyHit.height;
    const objectBottom = objectHit.y + objectHit.height;
    const linkRight = enemyHit.x + enemyHit.width;
    const objectRight = objectHit.x + objectHit.width;

    const bottomCollision = objectBottom - enemyHit.y;
    const topCollision = linkBottom - objectHit.y;
    const leftCollision = linkRight - objectHit.x;
    const rightCollision = objectRight - enemyHit.x;

    if (topCollision < bottomCollision && topCollision < leftCollision && topCollision < rightCollision ) {
      this.position[1] = objectHit.y - enemyHit.height
    }
    if (bottomCollision < topCollision && bottomCollision < leftCollision && bottomCollision < rightCollision) {
      this.position[1] = objectBottom
    }
    if (leftCollision < rightCollision && leftCollision < topCollision && leftCollision < bottomCollision) {
      this.position[0] = objectHit.x - enemyHit.width
    }
    if (rightCollision < leftCollision && rightCollision < topCollision && rightCollision < bottomCollision ) {
      this.position[0] = objectRight
    }
  };

};

export default Enemy;
