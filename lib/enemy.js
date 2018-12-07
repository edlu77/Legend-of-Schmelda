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
    }
  };

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
    if (this.poofing === true) {
      let currentFrame = DEATH_POOF[this.poofCurrentLoopIndex]
      let numFrames = 4;
      if (this.poofFrameCount < 5) {
        console.log(this.poofCurrentLoopIndex)

        this.drawDeathPoof(currentFrame),
        this.poofFrameCount++;
        return;
      }
      this.poofFrameCount = 0;
      this.poofCurrentLoopIndex++;
      console.log(this.poofCurrentLoopIndex)
      if (this.poofCurrentLoopIndex >= numFrames) {
        this.poofing = false;
        this.poofCurrentLoopIndex = 0
        return
      }
      this.drawDeathPoof(currentFrame)
    }
  }


  isFullyDestroyed() {
    if (this.poofing === true) {
      return false;
    } else if (this.dead === true) {
      return true;
    } else {
      return false;
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
