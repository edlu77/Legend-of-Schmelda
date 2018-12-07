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

/***/ "./lib/arrow.js":
/*!**********************!*\
  !*** ./lib/arrow.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const ARROW_SPRITES = [
  [295, 376, 15, 5],
  [194, 354, 15, 5],
  [401, 104, 5, 15],
  [395, 344, 5, 15],
] //left(invert), right, down, up

class Arrow {
  constructor(canvas, ctx, pos, direction) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.position = pos;
    this.scale = 1.5;
    this.arrow = new Image();
    this.arrow.src = './assets/link-2.gif';
    this.direction = direction;
    this.width = (this.direction === 0 || this.direction === 1) ? 15 : 5;
    this.height = (this.direction === 1 || this.direction === 0) ? 5 : 15;

    this.move = this.move.bind(this);
  }

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

  getSprite() {
    return ARROW_SPRITES[this.direction]
  }

  move() {
    if (this.direction === 0) {
      this.position[0] += 5;
    } else if (this.direction === 1) {
      this.position[0] -= 5;
    } else if (this.direction === 2) {
      this.position[1] += 5;
    } else {
      this.position[1] -= 5;
    }
  }

  draw() {
    let sprite = this.getSprite();
    // this.ctx.clearRect(this.position[0], this.position[1], this.hitbox().width, this.hitbox().height)
    // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.drawImage(
      this.arrow,
      sprite[0],
      sprite[1],
      sprite[2],
      sprite[3],
      this.position[0],
      this.position[1],
      this.scale*sprite[2],
      this.scale*sprite[3],
    )
  }

  isOffscreen() {
    if (
      this.position[0] > this.canvas.width ||
      this.position[0] + this.width < 0 ||
      this.position[1] + this.height < 0 ||
      this.position[1] > this.canvas.height) {
      return true
    } else {
      return false
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Arrow);


/***/ }),

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
/* harmony import */ var _arrow_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./arrow.js */ "./lib/arrow.js");




class Game {
  constructor(canvas, ctx) {
    this.enemies = [];
    this.link = new _link_js__WEBPACK_IMPORTED_MODULE_1__["default"](canvas, ctx);
    this.ctx = ctx;
    this.canvas = canvas;
    this.draw = this.draw.bind(this);
    this.loop = this.loop.bind(this);
    this.keys = [];
    this.arrows = [];
    this.oldTime = Date.now();
    this.linkHurtSound = new Audio('./assets/LTTP_Link_Hurt.wav');
    this.arrowHitSound = new Audio('./assets/LTTP_Arrow_Hit.wav');

    this.makeEnemy = this.makeEnemy.bind(this);
    this.makeArrow = this.makeArrow.bind(this);

    this.combineListeners();
    setInterval(this.makeEnemy, 3000)
  }


  combineListeners() {
    document.addEventListener('keydown', this.link.getMoveKeys);
    document.addEventListener('keydown', this.link.move);
    document.addEventListener('keyup', this.link.deleteMoveKeys);
    document.addEventListener('keyup', this.link.stopWalking);
    document.addEventListener('keydown', this.link.attack);
    document.addEventListener('keydown', this.link.useBow)
  }

  loop() {
    this.update();
    this.draw();
    window.requestAnimationFrame(this.loop)
  }

  update() {
    this.gameOver();
    this.updateEnemies();
    this.avoidOverlap();
    this.updateArrows();
    this.makeArrow();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.link.draw();
    this.drawEnemies();
    this.drawArrows();
  }

  makeEnemy() {
    if (this.enemies.length < 12) {
      this.enemies.push(new _wallmaster_js__WEBPACK_IMPORTED_MODULE_0__["default"](this.canvas, this.ctx, this.enemySpawnPos()));
    }
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
          this.linkHurtSound.play();
          // this.link.recoil();
          this.link.life -= 1;
          this.link.damaged();
          console.log(this.link.life)
        }
        if (this.link.attackedObject(this.enemies[i])) {
          this.enemies[i].recoil(this.link.currentDirection);
          this.enemies[i].life -= 1
        }
        //check for arrow hits
        for (let j = 0; j < this.arrows.length; j++) {
          if (this.enemies[i].collidedWith(this.arrows[j])) {
            this.arrowHitSound.play();
            this.enemies[i].recoil(this.arrows[j].direction);
            this.enemies[i].life -= 1;
            this.arrows.splice(j, 1);
          }
        }
      }
    }
  }

  drawEnemies() {
    for (let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].draw();
    }
  }

  makeArrow() {
    if (this.link.firingBow === true) {
      let startPos = this.link.position.slice(0);
      if (this.link.currentDirection === 0) {
        startPos[0] += this.link.scaledWidth;
        startPos[1] += this.link.scaledHeight/2;
      } else if (this.link.currentDirection === 1) {
        startPos[0] -= 20;
        startPos[1] = startPos[1] + this.link.scaledHeight/2;
      } else if (this.link.currentDirection === 2) {
        startPos[0] += this.link.scaledWidth/2;
        startPos[1] += this.link.scaledHeight;
      } else {
        startPos[0] += this.link.scaledWidth/2;
        startPos[1] -= 20;
      }

      if (this.arrowLimit()) {
        return
      } else {

        this.arrows.push(new _arrow_js__WEBPACK_IMPORTED_MODULE_2__["default"](this.canvas, this.ctx, startPos, this.link.currentDirection));
        this.link.ammo -= 1;
        console.log(this.link.ammo);
      }
    }
  }

  arrowLimit() {
    if (Date.now() - this.oldTime < 500) {
      return true
    }
    this.oldTime = Date.now();
  }

  updateArrows() {
    for (let i = 0; i < this.arrows.length; i++) {
      if (this.arrows[i].isOffscreen()) {
        this.arrows.splice(i, 1);
      }
      if (this.arrows[i]) {
        this.arrows[i].move();
      }
    }
  }

  drawArrows() {
    for (let i = 0; i < this.arrows.length; i++) {
      this.arrows[i].draw();
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
      console.log("You have died!")
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
  game.loop();
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
  [280, 883, 24, 22],
  [318, 883, 24, 22]
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
    this.scale = 2.6;
    this.speed = Math.random()*.8;

    this.move = this.move.bind(this);
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
    if (this.frameCount < 9) {
      this.frameCount++
    } else {
      this.walkCycle = (this.walkCycle === 1 ? 0 : 1)
      this.frameCount = 0;
    }

    let sprite = this.getSprite();

    // this.ctx.clearRect(this.position[0], this.position[1], this.hitbox().width, this.hitbox().height)
    // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
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
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Wallmaster);


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map