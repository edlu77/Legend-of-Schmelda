const directions = ["walkRight", "walkLeft", "walkDown", "walkUp"]

const dir_hash_y = {
  "walkRight": 120,
  "walkLeft": 30,
  "walkDown": 30,
  "walkUp": 120,
};

const dir_hash_x = {
  "walkRight": [241, 271, 301, 331, 361, 391],
  "walkLeft": [241, 271, 301, 331, 361, 391],
  "walkDown": [0, 30, 60, 90, 120, 150, 180, 210],
  "walkUp": [0, 30, 60, 90, 120, 150, 180, 210],
};

const standing = [
  [331, 120],
  [151, 0],
  [31, 0],
  [61, 0],
]; //right left down up

const attack_directions = ["attackRight", "attackLeft", "attackDown", "attackUp"]

const attack_y = {
  "attackRight": [180, 180, 180, 180, 178],
  "attackLeft": [90, 90, 90, 90, 88],
  "attackDown": [85, 85, 84, 84, 84, 84],
  "attackUp": [175, 174, 174, 174, 174],
}

const attack_x = {
  "attackRight": [237, 267, 297, 327, 357],
  "attackLeft": [237, 267, 297, 327, 357],
  "attackDown": [0, 30, 60, 90, 120, 146],
  "attackUp": [0, 30, 60, 90, 120],
}


class Link {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.link = new Image();
    this.link.src = './assets/link_sprites.png';
    this.width = 20;
    this.height = 25;
    this.scale = 4;
    this.scaledWidth = this.scale*this.width;
    this.scaledHeight = this.scale*this.height;
    this.currentLoopIndex = 0;
    this.currentAttackLoopIndex = 0;
    this.currentDirection = 0;
    this.position = [0, 0]
    this.frameCount = 0;
    this.attackFrameCount = 0;
    this.life = 3;
    this.attacking = false;
    this.walking = true;

    this.step = this.step.bind(this);
    this.move = this.move.bind(this);
    this.stand = this.stand.bind(this);
    this.attack = this.attack.bind(this);
    this.combineCallbacks = this.combineCallbacks.bind(this);
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
    debugger
    if (this.currentDirection === 0) {
      return {
        x: this.position[0] + this.scaledWidth,
        y: this.position[1],
        width: 8*this.scale,
        height: this.scaledHeight,
      }
    } else if (this.currentDirection === 1) {
      return {
        x: this.position[0] - 4*this.scale,
        y: this.position[1],
        width: 4*this.scale,
        height: this.scaledHeight,
      }
    } else if (this.currentDirection === 2) {
      return {
        x: this.position[0],
        y: this.position[1] + this.scaledHeight,
        width: this.scaledWidth + 4.5*this.scale,
        height: 8*this.scale,
      }
    } else {
      return {
        x: this.position[0],
        y: this.position[1] - 5*this.scale,
        width: this.scaledWidth + 4.5*this.scale,
        height: 5*this.scale,
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
        return true
      } else {
        return false
    }
  }


  recoil() {
    this.position = [this.position[0] - 50, this.position[1] - 50]
  }

  //moving

  drawWalkFrame(direction, frameX, frameY) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.drawImage(
      this.link,
      dir_hash_x[direction][frameX],
      dir_hash_y[direction],
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

      let numFrames = dir_hash_x[directions[this.currentDirection]].length
      let cycleLoop = Array.from({length: numFrames}, (x,i) => i);

      this.frameCount++
      if (this.frameCount < 5) {
        return;
      }
      this.frameCount = 0;
      this.drawWalkFrame(
        directions[this.currentDirection],
        cycleLoop[this.currentLoopIndex],

      );
      this.currentLoopIndex++;
      if (this.currentLoopIndex >= cycleLoop.length) {
        this.currentLoopIndex = 0;
      }
    }
  };

  move(e) {
    this.walking = true
    if (e.key === "ArrowLeft") {
      this.attacking = false;
      this.position[0] -= 20;
      this.currentDirection = 1;
    } else if (e.key === "ArrowRight") {
      this.attacking = false;
      this.position[0] += 20;
      this.currentDirection = 0;
    } else if (e.key === "ArrowDown") {
      this.attacking = false;
      this.position[1] += 20;
      this.currentDirection = 2;
    } else if (e.key === "ArrowUp") {
      this.attacking = false;
      this.position[1] -= 20;
      this.currentDirection = 3;
    } else {
      this.walking = false;
    }
  };

  //attacking

  drawAttackFrame(direction, frameX, frameY) {
    let attackWidth;
    let attackHeight;
    if (direction === "attackUp" || direction === "attackDown") {
      attackWidth = 24.5;
      attackHeight = 35;
    } else {
      attackWidth = 28;
      attackHeight = 25;
    };

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.drawImage(
      this.link,
      attack_x[direction][frameX],
      attack_y[direction][frameY],
      attackWidth,
      attackHeight,
      this.position[0],
      this.position[1],
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
      let numFrames = attack_x[attack_directions[this.currentDirection]].length
      let cycleLoop = Array.from({length: numFrames}, (x,i) => i);

      this.attackFrameCount++
      if (this.attackFrameCount < 3) {
        return;
      }
      this.attackFrameCount = 0;

      this.drawAttackFrame(
        attack_directions[this.currentDirection],
        cycleLoop[this.currentAttackLoopIndex],
        cycleLoop[this.currentAttackLoopIndex],
      ),
      this.currentAttackLoopIndex++;
      if (this.currentAttackLoopIndex >= cycleLoop.length) {
        this.currentAttackLoopIndex = 0;
        this.attacking = false;
        this.walking = true;
      }
    }
  }

  attack(e) {
    if (e.key === "a") {
      this.walking = false;
      this.attacking = true;
      console.log("attacking")
    } else {
      this.attacking = false;
    }
  }

  stand() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.drawImage(
      this.link,
      standing[this.currentDirection][0],
      standing[this.currentDirection][1],
      this.width,
      this.height,
      this.position[0],
      this.position[1],
      this.scaledWidth,
      this.scaledHeight,
    );
  }

  draw() {
    this.swing();
    this.step();
  };

  combineCallbacks(e) {
    this.attack(e);
    this.move(e);
  }

}

export default Link

// --------------------------------------
// let link = new Image();
// link.src = './assets/link_sprites.png';
// link.onload = function() {
//   init()
// };
//
//
// const directions = ["walkRight", "walkLeft", "walkDown", "walkUp"]
//
// const dir_hash_y = {
//   "walkRight": 120,
//   "walkLeft": 30,
//   "walkDown": 30,
//   "walkUp": 120,
// }
//
// const dir_hash_x = {
//   "walkRight": [241, 271, 301, 331, 361, 391],
//   "walkLeft": [241, 271, 301, 331, 361, 391],
//   "walkDown": [0, 30, 60, 90, 120, 150, 180, 210],
//   "walkUp": [0, 30, 60, 90, 120, 150, 180, 210],
// }
//
// const standing = [
//   [331, 120],
//   [151, 0],
//   [31, 0],
//   [61, 0],
// ] //right left down up
//
// const canvas = document.getElementById('canvas');
// const ctx = canvas.getContext('2d');
// const width = 20;
// const height = 25;
// const scale = 4;
// const scaledWidth = scale*width;
// const scaledHeight = scale*height;
// const offset = 30;
//
// function drawFrame(direction, frameX, frameY, canvasX, canvasY) {
//   ctx.drawImage(
//     link, dir_hash_x[direction][frameX], dir_hash_y[direction], width, height, canvasX, canvasY, scaledWidth, scaledHeight);
// }
//
// let currentLoopIndex = 0;
// let frameCount = 0;
// let currentDirection = 0;
// let canvasX = 0;
// let canvasY = 0;
// let moving = false
//
// function init() {
//   step()
// }
//
// function step() {
//   if (!moving) {
//     stand()
//     return
//   }
//
//   let numFrames = dir_hash_x[directions[currentDirection]].length
//   let cycleLoop = Array.from({length: numFrames}, (x,i) => i);
//   frameCount ++
//   if (frameCount < 4) {
//     window.requestAnimationFrame(step);
//     return;
//   }
//   frameCount = 0;
//   ctx.clearRect(0, 0, canvas.width, canvas.height)
//   drawFrame(directions[currentDirection], cycleLoop[currentLoopIndex], dir_hash_y[directions[currentDirection]], canvasX, canvasY, 80, 100);
//   currentLoopIndex++;
//   if (currentLoopIndex >= cycleLoop.length) {
//     currentLoopIndex = 0;
//   }
//   window.requestAnimationFrame(step);
// }
//
// function move(e) {
//   moving = true
//   if (e.key === "ArrowLeft") {
//     canvasX -= 25;
//     currentDirection = 1;
//   } else if (e.key === "ArrowRight") {
//     canvasX += 25;
//     currentDirection = 0;
//   } else if (e.key === "ArrowDown") {
//     canvasY += 25;
//     currentDirection = 2;
//   } else if (e.key === "ArrowUp") {
//     canvasY -= 25;
//     currentDirection = 3;
//   } else {
//     return
//   }
//   step()
// }
//
// function stand(e) {
//   moving = false
//   ctx.clearRect(0, 0, canvas.width, canvas.height)
//   ctx.drawImage(
//     link, standing[currentDirection][0], standing[currentDirection][1], width, height, canvasX, canvasY, scaledWidth, scaledHeight
//   );
// }
//

// document.onkeydown = this.link.move;
// document.onkeyup = this.stand;
