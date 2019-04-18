import ArrowItem from './arrow_item';
import HeartItem from './heart_item.js';

const directions = ["walkRight", "walkLeft", "walkDown", "walkUp"];

const WALK_SPRITES = {
  "walkRight": [
    [241, 120, 19, 24],
    [272, 120, 18, 24],
    [301, 120, 19, 23],
    [331, 120, 19, 23],
    [361, 120, 19, 24],
    [392, 120, 18, 24],
  ],
  "walkLeft": [
    [241, 30, 19, 24],
    [272, 30, 18, 24],
    [301, 30, 19, 23],
    [331, 30, 19, 23],
    [361, 30, 19, 24],
    [392, 30, 18, 24],
  ],
  "walkDown": [
    [3, 31, 16, 22],
    [33, 31, 16, 22],
    [63, 30, 16, 23],
    [93, 30, 16, 24],
    [123, 31, 16, 22],
    [153, 30, 16, 23],
    [183, 30, 16, 23],
    [213, 30, 16, 24],
  ],
  "walkUp": [
    [2, 120, 17, 23],
    [32, 120, 17, 24],
    [62, 121, 17, 22],
    [92, 121, 17, 22],
    [122, 120, 17, 23],
    [152, 120, 17, 24],
    [182, 121, 17, 22],
    [212, 121, 17, 22],
  ],
}

const WALK_POS_OFFSET = {
  "walkRight": [[0, -1], [1, -1], [0, 0], [0, 0], [0, -1], [1, -1]],
  "walkLeft": [[0, -1], [0, -1], [0, 0], [0, 0], [0, -1], [0, -1]],
  "walkDown": [[0, 0], [0, 0], [0, -1], [0, -2], [0, 0], [0, -1], [0, -1], [0, -2]],
  "walkUp": [[0, -1], [0, -2], [0, 0], [0, 0], [0, -1], [0, -2], [0, 0], [0, 0]],
}

const STANDING = [
  [331, 120, 19, 23],
  [151, 0, 19, 23],
  [33, 1, 16, 22],
  [212, 121, 17, 22],
]; //right left down up

const attack_directions = ["attackRight", "attackLeft", "attackDown", "attackUp"]

const ATTACK_X = {
  "attackRight": [242, 268, 295, 327, 359],
  "attackLeft": [242, 268, 295, 327, 359],
  "attackDown": [1, 30, 61, 91, 115, 145],
  "attackUp": [0, 30, 61, 89, 115],
}

const ATTACK_Y = {
  "attackRight": [180, 180, 181, 181, 176],
  "attackLeft": [90, 90, 91, 91, 86],
  "attackDown": [90, 90, 86, 86, 87, 88],
  "attackUp": [181, 177, 174, 177, 180],
}

const ATTACK_WIDTHS = {
  "attackRight": [18, 26, 31, 28, 23],
  "attackLeft": [18, 26, 31, 28, 23],
  "attackDown": [20, 22, 20, 20, 28, 32],
  "attackUp": [22, 22, 20, 24, 32],
}

const ATTACK_HEIGHTS = {
  "attackRight": [23, 24, 21, 21, 31],
  "attackLeft": [23, 24, 21, 21, 31],
  "attackDown": [23, 24, 31, 31, 29, 27],
  "attackUp": [22, 30, 35, 30, 23],
}

const ATTACK_POS_OFFSET = {
  "attackRight": [[0, 0], [2, -1], [4, 2], [2, 2], [1, 1]],
  "attackLeft": [[1, 0], [-10, -1], [-16, 2], [-12, 2], [-6, 1]],
  "attackDown": [[-5, 0], [-6, 1], [-4, 1], [-4, 3], [-4, 1], [-4, 1]],
  "attackUp": [[1, 0], [0, -8], [0, -13], [-4, -8], [-12, -1]],
}

const bow_directions = ["bowRight", "bowLeft", "bowDown", "bowUp"];

const BOW_SPRITES = {
  "bowRight": [
    [242, 150, 17, 23],
    [271, 151, 19, 22],
    [301, 150, 20, 23],
  ],
  "bowLeft": [
    [242, 60, 17, 23],
    [271, 61, 19, 22],
    [301, 60, 20, 23],
  ],
  "bowDown": [
    [2, 60, 17, 24],
    [32, 61, 18, 21],
    [62, 61, 18, 22],
  ],
  "bowUp": [
    [2, 151, 18, 22],
    [30, 151, 21, 21],
    [60, 151, 21, 22],
  ],
}

const BOW_POS_OFFSET = {
  "bowRight": [[0, 0], [1, 1], [0, 0]],
  "bowLeft": [[2, 0], [-1, 1], [-1, 0]],
  "bowDown": [[0, 0], [0, 1], [0, 0]],
  "bowUp": [[-2, 0], [-5, 1], [-5, 0]],
}

const spin_directions = ["spinRight", "spinLeft", "spinDown", "spinUp"];

const SPIN_SPRITES = {
  "spinRight": [
    [879, 103, 23, 23, 1],
    [835, 103, 31, 23, 1],
    [791, 104, 34, 23, 1],
    [747, 103, 34, 23, 1],
    [715, 103, 23, 23, 1],
    [689, 103, 16, 31, 2],
    [656, 103, 28, 23, 0],
    [624, 103, 28, 23, 0],
    [596, 97, 17, 29, 3],
    [559, 103, 28, 23, 1],
    [529, 103, 28, 23, 1],
    [500, 103, 23, 23, 1],
  ],
  "spinLeft": [
    [500, 19, 23, 23, 0],
    [536, 19, 31, 23, 0],
    [577, 20, 34, 23, 0],
    [621, 19, 34, 23, 0],
    [664, 19, 23, 23, 0],
    [697, 19, 16, 31, 2],
    [718, 19, 28, 23, 1],
    [750, 19, 28, 23, 1],
    [789, 13, 17, 29, 3],
    [815, 19, 28, 23, 0],
    [845, 19, 28, 23, 0],
    [879, 19, 23, 23, 0],
  ],
  "spinDown": [
    [504, 139, 20, 26, 3],
    [532, 126, 15, 36, 3],
    [554, 126, 16, 39, 3],
    [576, 138, 20, 26, 3],
    [604, 142, 28, 22, 0],
    [638, 142, 28, 22, 0],
    [673, 141, 17, 31, 2],
    [695, 142, 28, 22, 1],
    [729, 142, 28, 22, 1],
    [764, 136, 16, 28, 3],
    [791, 138, 20, 26, 3],
  ],
  "spinUp": [
    [487, 60, 20, 27, 2],
    [516, 61, 15, 35, 2],
    [541, 60, 17, 38, 2],
    [568, 60, 17, 38, 2],
    [595, 60, 20, 27, 2],
    [620, 60, 28, 22, 1],
    [657, 54, 16, 28, 3],
    [681, 60, 28, 22, 0],
    [720, 60, 16, 31, 2],
    [746, 61, 17, 31, 2],
    [767, 61, 20, 27, 2],
    [797, 61, 17, 22, 2],
  ],
}

const SPIN_POS_OFFSET = {
  "spinRight": [[-7, 0], [-14, 0], [-17, 1], [-16, 0], [-7, 0], [0, 0], [0, 0], [0, 0], [-1, -6], [-12, 0], [-12, 0], [-7, 0]],
  "spinLeft": [[0, 0], [0, 1], [0, 0], [0, 0], [0, 0], [0, 0], [-12, 0], [-12, 0], [0, -6], [0, 0], [0, 0], [0, 0]],
  "spinDown": [[0, -4], [0, -15], [-1, -15], [0, -5], [0, -1], [0, -1], [-1, -2], [-12, -1], [-12, -1], [0, -7], [0, -5], [0, -1]],
  "spinUp": [[-4, 0], [0, 1], [0, 0], [0, 0], [-4, 0], [-12, 0], [0, -6], [0, 0], [0, 0], [-1, 1], [-4, 1], [0, 1]],
}

class Link {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.link = new Image();
    this.link.src = './assets/link_sprites.png';
    this.link2 = new Image();
    this.link2.src = './assets/link-2.gif';
    this.width = 19;
    this.height = 23;
    this.scale = 2.6;
    this.scaledWidth = this.scale*this.width;
    this.scaledHeight = this.scale*this.height;
    this.position = [this.canvas.width/2 - this.scaledWidth/2, this.canvas.height/2];
    this.currentDirection = 2;
    this.currentLoopIndex = 0;
    this.attackCurrentLoopIndex = 0;
    this.bowCurrentLoopIndex = 0;
    this.spinCurrentLoopIndex = 0;
    this.frameCount = 0;
    this.attackFrameCount = 0;
    this.bowFrameCount = 0;
    this.spinFrameCount = 0;
    this.invFrameCount = 0;
    this.keys = {};
    this.attacking = false;
    this.walking = false;
    this.stunned = false;
    this.invincible = false;
    this.firingBow = false;
    this.spinning = false;
    this.ammo = 100;
    this.life = 3;
    this.right = false;
    this.left = false;
    this.down = false;
    this.up = false;
    this.spinPosX = this.position[0];
    this.spinPosY = this.position[1];
    this.attackDirection = this.currentDirection;
    this.attackValue = 0;

    this.swordSwingSounds = [
      new Audio('./assets/LTTP_Sword1.wav'),
      new Audio('./assets/LTTP_Sword2.wav')];
    this.arrowShootSound = new Audio('./assets/LTTP_Arrow_Shoot.wav');
    this.enemyHitSound = new Audio('./assets/LTTP_Enemy_Hit.wav');
    this.linkHurtSound = new Audio('./assets/LTTP_Link_Hurt.wav');
    this.getItemSound = new Audio('./assets/LTTP_Item.wav');

    this.move = this.move.bind(this);
    this.attack = this.attack.bind(this);
    this.useBow = this.useBow.bind(this);
    this.spin = this.spin.bind(this);
    this.stopWalking = this.stopWalking.bind(this);
    this.getMoveKeys = this.getMoveKeys.bind(this);
    this.deleteMoveKeys = this.deleteMoveKeys.bind(this);
  };

  hitbox() {
    return {
      x: this.position[0],
      y: this.position[1],
      width: this.scaledWidth,
      height: this.scaledHeight,
    }
  };

  hurtbox() {
    if (this.spinning) {
      let allFrames = SPIN_SPRITES[spin_directions[this.currentDirection]];
      let frame = allFrames[this.spinCurrentLoopIndex];
      let xWidth = frame[2];
      let yWidth = frame[3];
      return {
        x: this.spinPosX - 5,
        y: this.spinPosY - 5,
        width: xWidth * this.scale + 10,
        height: yWidth * this.scale + 10,
      }
    }
    else if (this.currentDirection === 0) {
      return {
        x: this.position[0] + this.scaledWidth,
        y: this.position[1] - 3*this.scale,
        width: 11*this.scale,
        height: this.scaledHeight + 6*this.scale,
      }
    } else if (this.currentDirection === 1) {
      return {
        x: this.position[0] - 11*this.scale,
        y: this.position[1] - 3*this.scale,
        width: 11*this.scale,
        height: this.scaledHeight + 6*this.scale,
      }
    } else if (this.currentDirection === 2) {
      return {
        x: this.position[0] - 6.5*this.scale,
        y: this.position[1] + this.scaledHeight,
        width: this.scaledWidth + 13*this.scale,
        height: 4*this.scale,
      }
    } else {
      return {
        x: this.position[0] - 7.5*this.scale,
        y: this.position[1] - 15*this.scale,
        width: this.scaledWidth + 15*this.scale,
        height: 6*this.scale,
      }
    }
  }

  collidedWith(object) {
    let linkHit = this.hitbox()
    let objectHit = object.hitbox()
    if (
      linkHit.x < objectHit.x + objectHit.width &&
      linkHit.x + linkHit.width > objectHit.x &&
      linkHit.y < objectHit.y + objectHit.height &&
      linkHit.y + linkHit.height > objectHit.y
      ) {
        return true
      } else {
        return false
    }
  };

  moveAwayFromObject(object) {
    const linkHit = this.hitbox()
    const objectHit = object.hitbox()

    const linkBottom = linkHit.y + linkHit.height;
    const objectBottom = objectHit.y + objectHit.height;
    const linkRight = linkHit.x + linkHit.width;
    const objectRight = objectHit.x + objectHit.width;

    const bottomCollision = objectBottom - linkHit.y;
    const topCollision = linkBottom - objectHit.y;
    const leftCollision = linkRight - objectHit.x;
    const rightCollision = objectRight - linkHit.x;

    if (topCollision < bottomCollision && topCollision < leftCollision && topCollision < rightCollision ) {
      this.position[1] = objectHit.y - linkHit.height
    }
    if (bottomCollision < topCollision && bottomCollision < leftCollision && bottomCollision < rightCollision) {
      this.position[1] = objectBottom
    }
    if (leftCollision < rightCollision && leftCollision < topCollision && leftCollision < bottomCollision) {
      this.position[0] = objectHit.x - linkHit.width
    }
    if (rightCollision < leftCollision && rightCollision < topCollision && rightCollision < bottomCollision ) {
      this.position[0] = objectRight
    }
  };

  attackedObject(object) {
    let swordHit = this.hurtbox()
    let objectHit = object.hitbox()
    if ( this.attacking &&
      swordHit.x < objectHit.x + objectHit.width &&
      swordHit.x + swordHit.width > objectHit.x &&
      swordHit.y < objectHit.y + objectHit.height &&
      swordHit.y + swordHit.height > objectHit.y
      ) {
        this.enemyHitSound.play();
        return true
      } else {
        return false
    }
  }

  recoil(attackedSide) {
    if (attackedSide === 0) {
      this.position = [this.position[0] + 70, this.position[1]]
    } else if (attackedSide === 1) {
      this.position = [this.position[0] - 70, this.position[1]]
    } else if (attackedSide === 2) {
      this.position = [this.position[0], this.position[1] + 70]
    } else {
      this.position = [this.position[0], this.position[1] - 70]
    }
  }

  damaged() {
    this.walking = false;
    // this.stunned = true;
    this.invincible = true;
    this.linkHurtSound.play();
    // this.link.recoil();
    this.life -= 1;
    setTimeout(() => {this.stunned = false;}, 500) //stunned after hit
    setTimeout(() => {this.invincible = false;}, 2000) //invincible for short time after getting hit
  }

  invincibility() {
    if (this.invincible && !this.spinning) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

      this.invFrameCount++
      if (this.invFrameCount < 5) {
        return;
      }
      this.invFrameCount = 0;

      if (this.attacking) {
        this.swing();
      } else if (this.walking) {
        this.step();
      } else if (this.firingBow) {
        this.fireBow();
      } else {
        this.drawStand();
      }
    }
  }

  //moving

  drawWalkFrame(frame, frameCount) {
    let walkPosX = this.position[0] + WALK_POS_OFFSET[directions[this.currentDirection]][frameCount][0]*this.scale;
    let walkPosY = this.position[1] + WALK_POS_OFFSET[directions[this.currentDirection]][frameCount][1]*this.scale;

    this.ctx.drawImage(
      this.link,
      frame[0],
      frame[1],
      frame[2],
      frame[3],
      walkPosX,
      walkPosY,
      this.scale*frame[2],
      this.scale*frame[3],
    )
    // this.ctx.beginPath();
    // this.ctx.rect(this.position[0], this.position[1], this.scaledWidth, this.scaledHeight)
    // this.ctx.lineWidth = 1
    // this.ctx.strokeStyle = 'yellow';
    // this.ctx.stroke();
  };

  step() {
    if (this.walking && !this.attacking && !this.spinning && !this.firingBow) {
      let allFrames = WALK_SPRITES[directions[this.currentDirection]];
      let numFrames = allFrames.length;
      if (this.frameCount < 3) {
        if (this.currentLoopIndex >= numFrames) {
          this.currentLoopIndex = 0;
        }
        this.drawWalkFrame(allFrames[this.currentLoopIndex], this.currentLoopIndex);
        this.frameCount++;
        return;
      }
      this.frameCount = 0;
      this.currentLoopIndex++;
      if (this.currentLoopIndex >= numFrames) {
        this.currentLoopIndex = 0;
      }
      this.drawWalkFrame(allFrames[this.currentLoopIndex], this.currentLoopIndex);
    }
  };

  getMoveKeys(e) {
    e.preventDefault();
    this.keys = (this.keys || []);
    this.keys[e.keyCode] = true;
    if (this.keys[40]) {
      this.down = true;
    }
    if (this.keys[38]) {
      this.up = true;
    }
    if (this.keys[37]) {
      this.left = true;
    }
    if (this.keys[39]) {
      this.right = true;
    }
  }

  deleteMoveKeys(e) {
    this.keys[e.keyCode] = false;
    if (!this.keys[40]) {
      this.down = false;
    }
    if (!this.keys[38]) {
      this.up = false;
    }
    if (!this.keys[37]) {
      this.left = false;
    }
    if (!this.keys[39]) {
      this.right = false;
    }
  }

  move() {
    if (this.stunned || this.attacking || this.spinning || this.firingBow) {
      return
    }
    if (this.down) {
      this.walking = true
      this.attacking = false;
      this.firingBow = false;
      this.position[1] += 3;
      this.currentDirection = 2;
    }
    if (this.up) {
      this.walking = true
      this.attacking = false;
      this.firingBow = false;
      this.position[1] -= 3;
      this.currentDirection = 3;
    }
    if (this.left) {
      this.walking = true
      this.attacking = false;
      this.firingBow = false;
      this.position[0] -= 3;
      this.currentDirection = 1;
    }
    if (this.right) {
      this.walking = true
      this.attacking = false;
      this.firingBow = false;
      this.position[0] += 3;
      this.currentDirection = 0;
    }
  };

  //attacking

  drawAttackFrame(direction, frame) {
    let attackPosX = this.position[0] + ATTACK_POS_OFFSET[direction][frame][0]*this.scale;
    let attackPosY = this.position[1] + ATTACK_POS_OFFSET[direction][frame][1]*this.scale;
    let attackWidth = ATTACK_WIDTHS[direction][frame]
    let attackHeight = ATTACK_HEIGHTS[direction][frame];

    this.ctx.drawImage(
      this.link,
      ATTACK_X[direction][frame],
      ATTACK_Y[direction][frame],
      attackWidth,
      attackHeight,
      attackPosX,
      attackPosY,
      attackWidth*this.scale,
      attackHeight*this.scale,
    )
    // this.ctx.beginPath();
    // this.ctx.rect(attackPosX, attackPosY, attackWidth*this.scale, attackHeight*this.scale)
    // this.ctx.lineWidth = 1
    // this.ctx.strokeStyle = 'yellow';
    // this.ctx.stroke();
  };

  swing() {
    this.attackDirection = this.currentDirection;
    if (this.attacking && !this.spinning) {
      let numFrames = ATTACK_X[attack_directions[this.currentDirection]].length;
      let cycleLoop = Array.from({length: numFrames}, (x,i) => i);
      while (this.attackCurrentLoopIndex <= cycleLoop.length) {
        if (this.attackFrameCount < 2) {
          this.drawAttackFrame(
            attack_directions[this.currentDirection],
            cycleLoop[this.attackCurrentLoopIndex],
          );
          this.attackFrameCount++
          return;
        }
        this.attackFrameCount = 0;

        this.attackCurrentLoopIndex++;
        if (this.attackCurrentLoopIndex === cycleLoop.length) {
          break;
        }

        this.drawAttackFrame(
          attack_directions[this.currentDirection],
          cycleLoop[this.attackCurrentLoopIndex],
        );
      }
      this.attackCurrentLoopIndex = 0;
      this.attacking = false;
    }
  }

  attack(e) {
    e.preventDefault();
    if ((this.stunned || this.firingBow || this.attacking || this.spinning)) {
      return;
    }
    if (this.keys[32]) {
      const swordSoundIdx = Math.floor(Math.random()*2)
      this.swordSwingSounds[swordSoundIdx].play();
      this.walking = false;
      this.attacking = true;
      this.attackValue = 1;
    }
  }

  drawBowFrame(frame, frameCount) {
    let bowPosX = this.position[0] + BOW_POS_OFFSET[bow_directions[this.currentDirection]][frameCount][0]*this.scale;
    let bowPosY = this.position[1] + BOW_POS_OFFSET[bow_directions[this.currentDirection]][frameCount][1]*this.scale;

    this.ctx.drawImage(
      this.link,
      frame[0],
      frame[1],
      frame[2],
      frame[3],
      bowPosX,
      bowPosY,
      frame[2]*this.scale,
      frame[3]*this.scale,
    )
  }

  fireBow() {
    if (this.firingBow) {
      let allFrames = BOW_SPRITES[bow_directions[this.currentDirection]]
      let numFrames = allFrames.length
      if (this.bowFrameCount < 5) {
        this.drawBowFrame(allFrames[this.bowCurrentLoopIndex], this.bowCurrentLoopIndex),
        this.bowFrameCount++;
        return;
      }
      this.bowFrameCount = 0;
      this.bowCurrentLoopIndex++;
      if (this.bowCurrentLoopIndex >= numFrames) {
        this.bowCurrentLoopIndex = 0
        this.firingBow = false;
        return
      }
      this.drawBowFrame(allFrames[this.bowCurrentLoopIndex], this.bowCurrentLoopIndex);
    }
  }

  useBow(e) {
    e.preventDefault();
    if ((this.stunned || this.firingBow || this.attacking || this.spinning)) {
      return;
    }
    if (this.keys[66] && this.ammo > 0) {
      this.firingBow = true;
      this.attackValue = 1;
    }
  }

  spin(e) {
    e.preventDefault();
    if ((this.stunned || this.firingBow || this.attacking || this.spinning)) {
      return;
    }
    if (this.keys[86]) {
      this.spinning = true;
      this.attackValue = 3;
    }
  }

  spinAttack() {
    if (this.spinning) {
      this.attacking = true;
      this.invincible = true;
      let allFrames = SPIN_SPRITES[spin_directions[this.currentDirection]]
      let numFrames = allFrames.length
      if (this.spinFrameCount < 2) {
        this.drawSpinFrame(allFrames[this.spinCurrentLoopIndex], this.spinCurrentLoopIndex),
        this.spinFrameCount++;
        return;
      }
      this.attackDirection = (allFrames[this.spinCurrentLoopIndex])[4]
      this.spinFrameCount = 0;
      this.spinCurrentLoopIndex++;
      if (this.spinCurrentLoopIndex >= numFrames) {
        this.spinCurrentLoopIndex = 0
        this.spinning = false;
        this.attacking = false;
        this.invincible = false;
        return
      }
      this.drawSpinFrame(allFrames[this.spinCurrentLoopIndex], this.spinCurrentLoopIndex);
    }
  }

  drawSpinFrame(frame, frameCount) {
    this.spinPosX = this.position[0] + SPIN_POS_OFFSET[spin_directions[this.currentDirection]][frameCount][0]*this.scale;
    this.spinPosY = this.position[1] + SPIN_POS_OFFSET[spin_directions[this.currentDirection]][frameCount][1]*this.scale;
    this.ctx.drawImage(
      this.link2,
      frame[0],
      frame[1],
      frame[2],
      frame[3],
      this.spinPosX,
      this.spinPosY,
      frame[2]*this.scale,
      frame[3]*this.scale,
    )

    // this.ctx.beginPath();
    // this.ctx.rect(this.spinPosX, this.spinPosY, frame[2]*this.scale, frame[3]*this.scale)
    // this.ctx.lineWidth = 1
    // this.ctx.strokeStyle = 'yellow';
    // this.ctx.stroke();
  }

  drawStand() {
    this.ctx.drawImage(
      this.link,
      STANDING[this.currentDirection][0],
      STANDING[this.currentDirection][1],
      STANDING[this.currentDirection][2],
      STANDING[this.currentDirection][3],
      this.position[0],
      this.position[1],
      STANDING[this.currentDirection][2]*this.scale,
      STANDING[this.currentDirection][3]*this.scale,
    );

    // this.ctx.beginPath();
    // this.ctx.rect(this.position[0], this.position[1], STANDING[this.currentDirection][2]*this.scale, STANDING[this.currentDirection][3]*this.scale)
    // this.ctx.lineWidth = 1
    // this.ctx.strokeStyle = 'yellow';
    // this.ctx.stroke();
  }

  stand() {
    if ((this.walking || this.attacking || this.firingBow || this.spinning) === false) {
      this.drawStand();
    }
  }

  pickUpItem(item) {
    this.getItemSound.play();
    if (item instanceof ArrowItem) {
      this.ammo += item.value;
    } else if (item instanceof HeartItem && this.life < 5) {
      this.life++;
    }
  }

  preventOffscreen() {
    if (this.position[0] < 0) {
      this.position[0] = 0
    }
    if (this.position[0] + this.scaledWidth > this.canvas.width) {
      this.position[0] = this.canvas.width - this.scaledWidth
    }
    if (this.position[1] < 0) {
      this.position[1] = 0
    }
    if (this.position[1] + this.scaledHeight > this.canvas.height) {
      this.position[1] = this.canvas.height - this.scaledHeight
    }
  }

  stopWalking(e) {
    this.walking = false;
  }

  draw() {
    this.preventOffscreen();
    this.swing();
    this.step();
    this.fireBow();
    this.spinAttack();
    this.stand();
    this.invincibility();
  };
}

export default Link;
