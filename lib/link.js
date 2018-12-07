const directions = ["walkRight", "walkLeft", "walkDown", "walkUp"]

const WALK_X = {
  "walkRight": [241, 271, 301, 331, 361, 391],
  "walkLeft": [241, 271, 301, 331, 361, 391],
  "walkDown": [0, 30, 60, 90, 120, 150, 180, 210],
  "walkUp": [0, 30, 60, 90, 120, 150, 180, 210],
};

const WALK_Y = {
  "walkRight": 120,
  "walkLeft": 30,
  "walkDown": 30,
  "walkUp": 120,
};

const STANDING = [
  [331, 120],
  [151, 0],
  [31, 0],
  [210, 120],
]; //right left down up

const attack_directions = ["attackRight", "attackLeft", "attackDown", "attackUp"]

const ATTACK_X = {
  "attackRight": [242, 268, 295, 328, 360],
  "attackLeft": [242, 268, 295, 327, 359],
  "attackDown": [0, 30, 60, 90, 115, 145],
  "attackUp": [0, 30, 60, 88, 115],
}

const ATTACK_Y = {
  "attackRight": [180, 180, 180, 180, 175],
  "attackLeft": [90, 90, 90, 90, 84],
  "attackDown": [90, 90, 86, 86, 86, 86],
  "attackUp": [174, 177, 174, 177, 180],
}

const ATTACK_WIDTHS = {
  "attackRight": [18, 26, 31, 28, 23],
  "attackLeft": [18, 26, 31, 28, 23],
  "attackDown": [21, 22, 21, 20, 28, 33],
  "attackUp": [21, 21, 21, 24, 35],
}

const ATTACK_HEIGHTS = {
  "attackRight": [23, 24, 22, 22, 31],
  "attackLeft": [23, 24, 22, 22, 31],
  "attackDown": [23, 24, 31, 31, 29, 27],
  "attackUp": [22, 30, 35, 30, 23],
}

const ATTACK_POS_OFFSET = {
  "attackRight": [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
  "attackLeft": [[-2, 0], [-10, 0], [-13, 0], [-13, 0], [-7, 0]],
  "attackDown": [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
  "attackUp": [[0, 0], [0, -7], [0, -8], [-4, -6], [-12, -1]],
}

const bow_directions = ["bowRight", "bowLeft", "bowDown", "bowUp"];

const BOW_SPRITES = {
  "bowRight": [
    [117, 367, 20, 24],
    [143, 367, 19, 24],
    [169, 367, 17, 24],
  ],
  "bowLeft": [
    [168, 342, 20, 24],
    [143, 342, 19, 24],
    [119, 342, 17, 24],
  ],
  "bowDown": [
    [324, 95, 17, 24],
    [348, 95, 18, 24],
    [372, 95, 19, 24],
  ],
  "bowUp": [
    [316, 342, 18, 22],
    [338, 342, 21, 22],
    [362, 342, 21, 22],
  ],
}

class Link {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.link = new Image();
    this.link.src = './assets/link_sprites.png';
    this.link2 = new Image();
    this.link2.src = './assets/link-2.gif';
    this.width = 20;
    this.height = 25;
    this.scale = 2.6;
    this.scaledWidth = this.scale*this.width;
    this.scaledHeight = this.scale*this.height;
    this.currentLoopIndex = 0;
    this.attackCurrentLoopIndex = 0;
    this.bowCurrentLoopIndex = 0;
    this.position = [this.canvas.width/2 - this.scaledWidth/2, this.canvas.height*.6];
    this.currentDirection = 3;
    this.frameCount = 0;
    this.attackFrameCount = 0;
    this.bowFrameCount = 0;
    this.keys = {};
    this.attacking = false;
    this.walking = false;
    this.stunned = false;
    this.invincible = false;
    this.firingBow = false;
    this.ammo = 100000;
    this.life = 3;

    this.swordSwingSounds = [
      new Audio('./assets/LTTP_Sword1.wav'),
      new Audio('./assets/LTTP_Sword2.wav')];
    this.arrowShootSound = new Audio('./assets/LTTP_Arrow_Shoot.wav');
    this.enemyHitSound = new Audio('./assets/LTTP_Enemy_Hit.wav');

    this.move = this.move.bind(this);
    this.attack = this.attack.bind(this);
    this.useBow = this.useBow.bind(this);
    this.stopWalking = this.stopWalking.bind(this);
    this.getMoveKeys = this.getMoveKeys.bind(this);
    this.deleteMoveKeys = this.deleteMoveKeys.bind(this);
    this.fireBow = this.fireBow.bind(this);
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
    if (this.currentDirection === 0) {
      return {
        x: this.position[0] + this.scaledWidth,
        y: this.position[1],
        width: 8*this.scale,
        height: this.scaledHeight,
      }
    } else if (this.currentDirection === 1) {
      return {
        x: this.position[0] - 8*this.scale,
        y: this.position[1],
        width: 8*this.scale,
        height: this.scaledHeight,
      }
    } else if (this.currentDirection === 2) {
      return {
        x: this.position[0],
        y: this.position[1] + this.scaledHeight,
        width: this.scaledWidth,
        height: 7*this.scale,
      }
    } else {
      return {
        x: this.position[0],
        y: this.position[1] - 7*this.scale,
        width: this.scaledWidth,
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
    this.stunned = true;
    this.invincible = true;
    setTimeout(() => {this.stunned = false;}, 500) //stunned after hit
    setTimeout(() => {this.invincible = false;}, 2000) //invincible for short time after getting hit
  }

  invincibility() {
    if (this.invincible === true) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

      this.frameCount++
      if (this.frameCount < 5) {
        return;
      }
      this.frameCount = 0;

      if (this.attacking === true) {
        this.swing();
      } else {
        this.drawStand();
      }
    }
  }

  oppositeDirection() {
    switch (this.currentDirection) {
      case 0:
        return 1;
      case 1:
        return 0;
      case 2:
        return 3;
      case 3:
        return 2;
    }
  }

  //moving

  drawWalkFrame(direction, frame) {
    this.ctx.drawImage(
      this.link,
      WALK_X[direction][frame],
      WALK_Y[direction],
      this.width,
      this.height,
      this.position[0],
      this.position[1],
      this.scaledWidth,
      this.scaledHeight,
    )
    // this.ctx.beginPath();
    // this.ctx.rect(this.position[0], this.position[1], this.scaledWidth, this.scaledHeight)
    // this.ctx.lineWidth = 1
    // this.ctx.strokeStyle = 'yellow';
    // this.ctx.stroke();
  };

  step() {
    if (this.walking === true) {
      let numFrames = WALK_X[directions[this.currentDirection]].length
      let cycleLoop = Array.from({length: numFrames}, (x,i) => i);

      if (this.frameCount < 5) {
        this.drawWalkFrame(
          directions[this.currentDirection],
          cycleLoop[this.currentLoopIndex],
        );
        this.frameCount++
        return
      }
      this.frameCount = 0;
      this.currentLoopIndex++;
      // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.width)
      this.drawWalkFrame(
        directions[this.currentDirection],
        cycleLoop[this.currentLoopIndex],
      );
      if (this.currentLoopIndex >= cycleLoop.length) {
        this.currentLoopIndex = 0;
      }
    }
    this.frameCount = 0;
  };

  getMoveKeys(e) {
    this.keys = (this.keys || []);
    this.keys[e.keyCode] = true;
  }

  deleteMoveKeys(e) {
    this.keys[e.keyCode] = false;
  }

  move(e) {
    if (this.stunned === true || this.attacking === true) {
      return
    }
    if (this.keys[65] === true) {
      this.walking = true
      this.attacking = false;
      this.position[0] -= 15;
      this.currentDirection = 1;
    }
    if (this.keys[68] === true) {
      this.walking = true
      this.attacking = false;
      this.position[0] += 15;
      this.currentDirection = 0;
    }
    if (this.keys[83] === true) {
      this.walking = true
      this.attacking = false;
      this.position[1] += 15;
      this.currentDirection = 2;
    }
    if (this.keys[87] === true) {
      this.walking = true
      this.attacking = false;
      this.position[1] -= 15;
      this.currentDirection = 3;
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
    // this.ctx.rect(this.position[0], this.position[1], attackWidth*this.scale, attackHeight*this.scale)
    // this.ctx.lineWidth = 1
    // this.ctx.strokeStyle = 'yellow';
    // this.ctx.stroke();
  };

  swing() {
    if (this.attacking === true) {
      let numFrames = ATTACK_X[attack_directions[this.currentDirection]].length;
      let cycleLoop = Array.from({length: numFrames}, (x,i) => i);
      while (this.attackCurrentLoopIndex <= cycleLoop.length) {
        if (this.attackFrameCount < 3) {
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
        // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
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
    if ((this.stunned || this.firingBow || this.attacking) === true) {
      return;
    }
    if (this.keys[72] === true) {
      const swordSoundIdx = Math.floor(Math.random()*2)
      this.swordSwingSounds[swordSoundIdx].play();
      this.walking = false;
      this.attacking = true;
    }
  }

  drawBowFrame(frames) {
    this.ctx.drawImage(
      this.link2,
      frames[0],
      frames[1],
      frames[2],
      frames[3],
      this.position[0],
      this.position[1],
      frames[2]*this.scale,
      frames[3]*this.scale,
    )
  }

  fireBow() {
    if (this.firingBow === true) {
      let allFrames = BOW_SPRITES[bow_directions[this.currentDirection]]
      let numFrames = allFrames.length
      while (this.bowCurrentLoopIndex < numFrames) {
        if (this.bowFrameCount < 8) {
          this.drawBowFrame(allFrames[this.bowCurrentLoopIndex]),
          this.bowFrameCount++
          return;
        }
        this.bowFrameCount = 0;
        this.bowCurrentLoopIndex++;
        if (this.bowCurrentLoopIndex === numFrames) {
          break;
        }
        // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.drawBowFrame(allFrames[this.bowCurrentLoopIndex]);
      }
      this.bowCurrentLoopIndex = 0;
      this.firingBow = false;
    }
  }

  useBow(e) {
    if ((this.stunned || this.firingBow || this.attacking) === true) {
      return;
    }
    if (this.keys[66] === true && this.ammo > 0) {
      this.arrowShootSound.play();
      this.firingBow = true;
    }
  }

  drawStand() {
    this.ctx.drawImage(
      this.link,
      STANDING[this.currentDirection][0],
      STANDING[this.currentDirection][1],
      this.width,
      this.height,
      this.position[0],
      this.position[1],
      this.scaledWidth,
      this.scaledHeight,
    );
  }

  stand() {
    if ((this.walking || this.attacking || this.firingBow) === false) {
      // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawStand();
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
    this.stand();
    this.invincibility();
  };
}

export default Link;
