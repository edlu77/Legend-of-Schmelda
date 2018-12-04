/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/schmelda.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/enemy.js":
/*!**********************!*\
  !*** ./lib/enemy.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Enemy {
  constructor(canvas, ctx, pos) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.position = pos;

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
      this.position[0] += this.speed;
    }
    if (object.position[1] < this.position[1]) {
      this.position[1] += this.speed;
    }
    if (object.position[0] > this.position[0]) {
      this.position[0] -= this.speed;
    }
    if (object.position[1] > this.position[1]) {
      this.position[1] -= this.speed;
    }
  };

};

/* harmony default export */ __webpack_exports__["default"] = (Enemy);


/***/ }),

/***/ "./lib/game.js":
/*!*********************!*\
  !*** ./lib/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wallmaster_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wallmaster.js */ "./lib/wallmaster.js");
/* harmony import */ var _link_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./link.js */ "./lib/link.js");



class Game {
  constructor(canvas, ctx) {
    this.enemies = [];
    this.link = new _link_js__WEBPACK_IMPORTED_MODULE_1__["default"](canvas, ctx);
    this.ctx = ctx;
    this.canvas = canvas;
    this.draw = this.draw.bind(this);
    this.makeEnemy = this.makeEnemy.bind(this);
    this.loop = this.loop.bind(this)
  }

  loop() {
    this.update();
    this.draw();
    window.requestAnimationFrame(this.loop)
  }

  update() {
    this.gameOver();
    this.avoidOverlap();
    this.updateEnemies();
  }

  draw() {
    this.link.draw();
    this.drawEnemies();
  }

  updateEnemies() {
    for (let i = 0; i < this.enemies.length; i++) {
      //clear any dead enemies from the state
      if (this.enemies[i].isDead()) {
        this.enemies.splice(i, 1);
      }
      if (this.enemies[i]) {
        this.enemies[i].move(this.link);
        if (this.link.collidedWith(this.enemies[i]) && this.link.invincible === false) {
          this.link.recoil(this.enemies[i].currentDirection);
          this.link.life -= 1;
          this.link.damaged();
          console.log(this.link.life)
        }
        if (this.link.attackedObject(this.enemies[i])) {
          this.enemies[i].recoil(this.link.currentDirection);
          this.enemies[i].life -= 1
        }
      }
    }
  }

  drawEnemies() {
    for (let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].draw();
    }
  }

  makeEnemy() {
    if (this.enemies.length < 5) {
      this.enemies.push(new _wallmaster_js__WEBPACK_IMPORTED_MODULE_0__["default"](this.canvas, this.ctx, this.enemySpawnPos()));
    }
  }

  enemySpawnPos() {
    const wall = Math.floor(Math.random()*4);
    switch (wall) {
      case 0:
        return [-50, Math.random()*this.canvas.height]
      case 1:
        return [this.canvas.width+50, Math.random()*this.canvas.height]
      case 2:
        return [Math.random()*this.canvas.width, this.canvas.height+ 50]
      case 3:
        return [Math.random()*this.canvas.width, -50]
    }
  }

  avoidOverlap() {
    for (let i = 0; i < this.enemies.length-1; i++) {
      for (let j = i+1; j < this.enemies.length; j++) {
        if (this.enemies[i].collidedWith(this.enemies[j])) {
          this.enemies[i].moveAwayFromObject(this.enemies[j])
          this.enemies[j].moveAwayFromObject(this.enemies[i])
        }
      }
    }
  }

  gameOver() {
    if (this.link.life === 0) {
      // console.log("You have died!")
    }
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Game);


/***/ }),

/***/ "./lib/link.js":
/*!*********************!*\
  !*** ./lib/link.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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

class Link {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.link = new Image();
    this.link.src = './assets/link_sprites.png';
    this.width = 20;
    this.height = 25;
    this.scale = 1.5;
    this.scaledWidth = this.scale*this.width;
    this.scaledHeight = this.scale*this.height;
    this.currentLoopIndex = 0;
    this.currentAttackLoopIndex = 0;
    this.currentDirection = 3;
    this.position = [this.canvas.width/2 - this.scaledWidth/2, this.canvas.height*.6];
    this.frameCount = 0;
    this.attackFrameCount = 0;
    this.life = 3;
    this.attacking = false;
    this.walking = false;
    this.stunned = false;
    this.invincible = false;

    // this.step = this.step.bind(this);
    this.move = this.move.bind(this);
    this.stand = this.stand.bind(this);
    this.step = this.step.bind(this);
    this.swing = this.swing.bind(this);
    this.stopWalking = this.stopWalking.bind(this);
    this.attack = this.attack.bind(this);
    this.combineCallbacks = this.combineCallbacks.bind(this);
    this.draw = this.draw.bind(this);
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
        y: this.position[1] - 6*this.scale,
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
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.width)

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
    if (this.stunned) {
      return
    }
    if (e.key === "a") {
      this.walking = true
      this.attacking = false;
      this.position[0] -= 15;
      this.currentDirection = 1;
    } else if (e.key === "d") {
      this.walking = true
      this.attacking = false;
      this.position[0] += 15;
      this.currentDirection = 0;
    } else if (e.key === "s") {
      this.walking = true
      this.attacking = false;
      this.position[1] += 15;
      this.currentDirection = 2;
    } else if (e.key === "w") {
      this.walking = true
      this.attacking = false;
      this.position[1] -= 15;
      this.currentDirection = 3;
    }

  };

  //attacking

  drawAttackFrame(direction, frame) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
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
      let numFrames = ATTACK_X[attack_directions[this.currentDirection]].length
      let cycleLoop = Array.from({length: numFrames}, (x,i) => i);
      while (this.currentAttackLoopIndex <= cycleLoop.length) {
        this.attackFrameCount++
        if (this.attackFrameCount < 5) {
          return;
        }
        this.attackFrameCount = 0;

        if (this.currentAttackLoopIndex === cycleLoop.length) {
          break;
        }
        this.drawAttackFrame(
          attack_directions[this.currentDirection],
          cycleLoop[this.currentAttackLoopIndex],
        ),
        this.currentAttackLoopIndex++;
      }
      this.currentAttackLoopIndex = 0;
      this.walking = false;
      this.attacking = false;
    }
  }

  attack(e) {
    if (this.stunned) {
      return;
    }
    if(e.key === "h") {
      this.walking = false;
      this.attacking = true;
    }
  }

  stand() {
    if ((this.walking || this.attacking) === false) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
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

  combineCallbacks(e) {
    this.attack(e);
    this.move(e);
  }

  draw() {
    this.preventOffscreen();
    this.swing();
    this.step();
    this.stand();

  };
}

/* harmony default export */ __webpack_exports__["default"] = (Link);


/***/ }),

/***/ "./lib/schmelda.js":
/*!*************************!*\
  !*** ./lib/schmelda.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game.js */ "./lib/game.js");


document.addEventListener('DOMContentLoaded', ()=> {
  const mainCanvas = document.getElementById('main-window');
  const ctx = mainCanvas.getContext('2d');

  const game = new _game_js__WEBPACK_IMPORTED_MODULE_0__["default"](mainCanvas, ctx)
  setInterval(game.makeEnemy, 3000)
  game.loop();
  // document.onclick = game.link.attack;
  document.onkeydown = game.link.combineCallbacks;
  document.onkeyup = game.link.stopWalking;
});


/***/ }),

/***/ "./lib/wallmaster.js":
/*!***************************!*\
  !*** ./lib/wallmaster.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _enemy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enemy */ "./lib/enemy.js");


const WALLMASTER_SPRITES = [
  [281, 883, 23, 23],
  [323, 883, 23, 23]
]

class Wallmaster extends _enemy__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(canvas, ctx, pos) {
    super(canvas, ctx, pos);
    this.wallmaster = new Image();
    this.wallmaster.src = './assets/enemies.png';
    this.currentLoopIndex = 0;
    this.walkCycle = 0;
    this.frameCount = -1;
    this.life = 3;
    this.scale = 1.5;
    this.speed = Math.random()*.7;
    this.move = this.move.bind(this);
    this.draw = this.draw.bind(this);
  }

  hitbox() {
    return {
      x: this.position[0],
      y: this.position[1],
      width: 23*this.scale,
      height: 23*this.scale,
    }
  };

  moveTowardsObject(object) {
    if (object.position[0] < this.position[0]) {
      this.position[0] -= this.speed;
      this.currentDirection = 1;
    }
    if (object.position[1] < this.position[1]) {
      this.position[1] -= this.speed;
      this.currentDirection = 2;
    }
    if (object.position[0] > this.position[0]) {
      this.position[0] += this.speed;
      this.currentDirection = 0;
    }
    if (object.position[1] > this.position[1]) {
      this.position[1] += this.speed;
      this.currentDirection = 3;
    }
  }

  move(player) {
    // if (this.currentDirection === 0) {
    //   this.position[0] += this.speed;
    //   if (this.position[0] + this.width > this.canvas.width || this.position[0] < 0) {
    //     this.currentDirection = 1
    //   }
    // } else if (this.currentDirection === 1) {
    //   this.position[0] -= this.speed;
    //   if (this.position[0] + this.width > this.canvas.width || this.position[0] < 0) {
    //     this.currentDirection = 0
    //   }
    // }
    this.moveTowardsObject(player)
  }

  getSprite() {
    if (this.walkCycle === 0) {
      return WALLMASTER_SPRITES[0]
    } else {
      return WALLMASTER_SPRITES[1]
    }
  }

  draw() {
    this.ctx.clearRect(this.position[0]-2, this.position[1]-2, this.width+4, this.height+4)
    if (this.frameCount < 9) {
      this.frameCount++
    } else {
      this.walkCycle = (this.walkCycle === 1 ? 0 : 1)
      this.frameCount = 0;
    }

    let sprite = this.getSprite();

    this.ctx.drawImage(
      this.wallmaster,
      sprite[0],
      sprite[1],
      sprite[2],
      sprite[3],
      this.position[0],
      this.position[1],
      this.scale*sprite[2],
      this.scale*sprite[3],
    )
    // window.requestAnimationFrame(this.draw)
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Wallmaster);


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map