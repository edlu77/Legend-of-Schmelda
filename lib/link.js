const directions = ["walkRight", "walkLeft", "walkDown", "walkUp"]

const dir_hash_y = {
  "walkRight": 120,
  "walkLeft": 30,
  "walkDown": 30,
  "walkUp": 120,
}

const dir_hash_x = {
  "walkRight": [241, 271, 301, 331, 361, 391],
  "walkLeft": [241, 271, 301, 331, 361, 391],
  "walkDown": [0, 30, 60, 90, 120, 150, 180, 210],
  "walkUp": [0, 30, 60, 90, 120, 150, 180, 210],
}

const standing = [
  [331, 120],
  [151, 0],
  [31, 0],
  [61, 0],
] //right left down up

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
    this.currentDirection = 0;
    this.canvasX = 0;
    this.canvasY = 0;
    this.frameCount = 0;

    this.step = this.step.bind(this)
    this.move = this.move.bind(this)
  }

  drawFrame(direction, frameX, frameY, canvasX, canvasY) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.drawImage(
      this.link,
      dir_hash_x[direction][frameX],
      dir_hash_y[direction],
      this.width,
      this.height,
      canvasX,
      canvasY,
      this.scaledWidth,
      this.scaledHeight,
    )
  }

  step() {
    let numFrames = dir_hash_x[directions[this.currentDirection]].length
    let cycleLoop = Array.from({length: numFrames}, (x,i) => i);
    this.frameCount++
    if (this.frameCount < 5) {
      window.requestAnimationFrame(this.step);
      return;
    }
    this.frameCount = 0;
    this.drawFrame(
      directions[this.currentDirection],
      cycleLoop[this.currentLoopIndex],
      dir_hash_y[directions[this.currentDirection]],
      this.canvasX,
      this.canvasY,
      80,
      100
    );

    this.currentLoopIndex++;
    if (this.currentLoopIndex >= cycleLoop.length) {
      this.currentLoopIndex = 0;
    }
    window.requestAnimationFrame(this.step);
  }

  draw() {
    this.step()
  }

  move(e) {
    if (e.key === "ArrowLeft") {
      this.canvasX -= 20;
      this.currentDirection = 1;
    } else if (e.key === "ArrowRight") {
      this.canvasX += 20;
      this.currentDirection = 0;
    } else if (e.key === "ArrowDown") {
      this.canvasY += 20;
      this.currentDirection = 2;
    } else if (e.key === "ArrowUp") {
      this.canvasY -= 20;
      this.currentDirection = 3;
    } else {
      return
    }
    // step()
  }

// stand(e) {
//     moving = false
//     ctx.clearRect(0, 0, canvas.width, canvas.height)
//     ctx.drawImage(
//       link, standing[currentDirection][0], standing[currentDirection][1], width, height, canvasX, canvasY, scaledWidth, scaledHeight
//     );
//   }

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
