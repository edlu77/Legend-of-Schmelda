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
]

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

/***/ "./lib/arrow_item.js":
/*!***************************!*\
  !*** ./lib/arrow_item.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./item */ "./lib/item.js");


const ARROW_ITEM_SPRITES = {
  1: [192, 8, 16, 16],
  5: [235, 8, 16, 16],
  10: [259, 8, 16, 16],
}

class ArrowItem extends _item__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(canvas, ctx, pos, value) {
    super(canvas, ctx, pos);
    this.arrowItem = new Image();
    this.arrowItem.src = './assets/items-overworld.png';
    this.value = value;
    this.width = 16;
    this.height = 16;
    this.weight = 10;
  }

  hitbox() {
    return {
      x: this.position[0],
      y: this.position[1],
      width: this.width*this.scale,
      height: this.height*this.scale,
    }
  };

  getSprite(){
    return ARROW_ITEM_SPRITES[this.value]
  }

  draw() {
    if (this.flashing) {
      this.flashFrameCount++
      if (this.flashFrameCount < 5) {
        return;
      }
      this.flashFrameCount = 0;
    }
    const sprite = this.getSprite();
    this.ctx.drawImage(
      this.arrowItem,
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

/* harmony default export */ __webpack_exports__["default"] = (ArrowItem);


/***/ }),

/***/ "./lib/enemy.js":
/*!**********************!*\
  !*** ./lib/enemy.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
  }

  recoil(attackedSide) {
    this.flashing = true;
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

  damaged() {
    this.flashing = true;
    this.life -= 1;
    setTimeout(() => {this.flashing = false;}, 2000)
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
    if (this.poofing) {
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
    if (this.poofing) {
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
/* harmony import */ var _moblin_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./moblin.js */ "./lib/moblin.js");
/* harmony import */ var _link_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./link.js */ "./lib/link.js");
/* harmony import */ var _arrow_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./arrow.js */ "./lib/arrow.js");
/* harmony import */ var _arrow_item_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./arrow_item.js */ "./lib/arrow_item.js");
/* harmony import */ var _heart_item_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./heart_item.js */ "./lib/heart_item.js");
/* harmony import */ var _obstacle_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./obstacle.js */ "./lib/obstacle.js");
/* harmony import */ var _info_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./info.js */ "./lib/info.js");









class Game {
  constructor(canvas, ctx) {
    this.enemies = [];
    this.obstacles = [];
    this.link = new _link_js__WEBPACK_IMPORTED_MODULE_2__["default"](canvas, ctx);
    this.ctx = ctx;
    this.canvas = canvas;
    this.keys = [];
    this.arrows = [];
    this.items = [];
    this.oldTime = Date.now();
    this.isGameOver = false;
    this.score = 0;
    this.canRestart = false;
    this.currentMusic = null;
    this.musicMuted = false;

    this.mainMenuTheme = new Audio('./assets/Name_Entry.mp3');
    this.hyruleTheme = new Audio('./assets/Hyrule_Field.mp3');
    this.gameOverTheme = new Audio('./assets/Kakariko_Village.mp3');
    this.arrowHitSound = new Audio('./assets/LTTP_Arrow_Hit.wav');
    this.startGameSound = new Audio('./assets/LTTP_Secret.wav');

    this.draw = this.draw.bind(this);
    this.loop = this.loop.bind(this);
    this.makeEnemy = this.makeEnemy.bind(this);
    this.makeArrow = this.makeArrow.bind(this);
    this.startGame = this.startGame.bind(this);
    this.playTheme = this.playTheme.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.muteMusic = this.muteMusic.bind(this);
    this.onMusic = this.onMusic.bind(this);
  }

  openMenu() {
    const musicOffButton = document.getElementsByClassName('music-button off')[0];
    const musicOnButton = document.getElementsByClassName('music-button on')[0];
    if (this.musicMuted) {
      musicOffButton.className = 'music-button off hidden';
      musicOnButton.className = 'music-button on';
    } else {
      musicOffButton.className = 'music-button off';
      musicOnButton.className = 'music-button on hidden';
    }
    this.currentMusic = this.mainMenuTheme;
    this.playTheme();
    document.addEventListener('click', this.muteMusic);
    document.addEventListener('click', this.onMusic);
    this.setStartButton();
  }

  setStartButton() {
    const startGameButton = document.getElementsByClassName('start-game-button')[0]
    startGameButton.addEventListener('click', (e) => {
      this.startGameSound.play();
      this.currentMusic.pause();
      this.openGameWindow();
      setTimeout(this.startGame, 800);
    });
  }

  openGameWindow() {
    const mainMenu = document.getElementsByClassName('main-menu')[0];
    mainMenu.className = 'main-menu close';
    const gameOver = document.getElementsByClassName('game-over')[0];
    gameOver.className = 'game-over close';
    const gameWindow = document.getElementsByClassName('game-window')[0];
    gameWindow.className = 'game-window';
  }

  playTheme() {
    if (!this.musicMuted) {
      this.currentMusic.play();
    }
  }

  startGame() {
    this.isGameOver = false;
    this.canRestart = false;
    this.arrows = [];
    this.items = [];
    this.enemies = [];
    this.score = 0;
    this.oldTime = Date.now();
    this.link = new _link_js__WEBPACK_IMPORTED_MODULE_2__["default"](this.canvas, this.ctx);
    this.currentMusic = this.hyruleTheme;
    setTimeout(this.playTheme, 1000);
    this.combineListeners();
    this.makeObstacles();
    this.loop();
  }

  stopGame() {
    this.enemies = [];
    const gameWindow = document.getElementsByClassName('game-window')[0];
    gameWindow.className = 'game-window close';
  }

  gameOver() {
    if (this.isGameOver) {
      this.canRestart = true;
      this.stopGame();
      const gameOver = document.getElementsByClassName('game-over')[0];
      gameOver.className = 'game-over';
      this.currentMusic.pause();
      this.currentMusic = this.gameOverTheme;
      this.playTheme();
    }
  }

  restartGame(e) {
    if (this.canRestart) {
      const restartButton = document.getElementsByClassName('restart-button')[0]
      if (e.target === restartButton) {
        this.startGameSound.play();
        this.currentMusic.pause();
        this.openGameWindow();
        setTimeout(this.startGame, 800);
      }
    }
  }

  muteMusic(e) {
    const musicOffButton = document.getElementsByClassName('music-button off')[0];
    const musicOnButton = document.getElementsByClassName('music-button on')[0];
    if (!this.musicMuted) {
      if (e.target === musicOffButton) {
        this.currentMusic.pause();
        this.musicMuted = true;
        musicOffButton.className = 'music-button off hidden';
        musicOnButton.className = 'music-button on';
      }
    }
  }

  onMusic(e) {
    const musicOnButton = document.getElementsByClassName('music-button on')[0];
    const musicOffButton = document.getElementsByClassName('music-button off')[0];
    if (this.musicMuted) {
      if (e.target === musicOnButton) {
        this.currentMusic.play();
        this.musicMuted = false;
        musicOnButton.className = 'music-button on hidden';
        musicOffButton.className = 'music-button off';
      }
    }
  }

  combineListeners() {
    document.addEventListener('keydown', this.link.getMoveKeys);
    document.addEventListener('keyup', this.link.deleteMoveKeys);
    document.addEventListener('keyup', this.link.stopWalking);
    document.addEventListener('keydown', this.link.attack);
    document.addEventListener('keydown', this.link.useBow);
    document.addEventListener('keydown', this.link.spin);
    document.addEventListener('click', this.restartGame);

  }

  makeObstacles() {
    this.obstacles.push(new _obstacle_js__WEBPACK_IMPORTED_MODULE_6__["default"]([0, 0], 355, 23))
    this.obstacles.push(new _obstacle_js__WEBPACK_IMPORTED_MODULE_6__["default"]([0, 32], 25, 72));
    this.obstacles.push(new _obstacle_js__WEBPACK_IMPORTED_MODULE_6__["default"]([0, 193], 79, 48));
    this.obstacles.push(new _obstacle_js__WEBPACK_IMPORTED_MODULE_6__["default"]([0, 241], 96, 11));
    this.obstacles.push(new _obstacle_js__WEBPACK_IMPORTED_MODULE_6__["default"]([329, 29], 26, 72));
    this.obstacles.push(new _obstacle_js__WEBPACK_IMPORTED_MODULE_6__["default"]([268, 195], 87, 57));
    this.obstacles.push(new _obstacle_js__WEBPACK_IMPORTED_MODULE_6__["default"]([252, 244], 16, 8));
  }

  loop() {
    if (!this.isGameOver) {
      this.update();
      this.draw();
      window.requestAnimationFrame(this.loop)
    }
  }

  update() {
    this.link.move();
    this.handleObstacleCollisions();
    // this.makeEnemy();
    this.updateEnemies();
    this.avoidOverlap();
    this.updateArrows();
    this.makeArrow();
    this.updateItems();
    this.gameOver();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.link.draw();
    this.drawEnemies();
    this.drawArrows();
    this.drawItems();
    // this.drawObstacles();
  }


  // drawObstacles() {
  //   for (var i = 0; i < this.obstacles.length; i++) {
  //     this.ctx.beginPath();
  //     this.ctx.rect(this.obstacles[i].hitbox().x, this.obstacles[i].hitbox().y, this.obstacles[i].hitbox().width, this.obstacles[i].hitbox().height)
  //     this.ctx.lineWidth = 1
  //     this.ctx.strokeStyle = 'yellow';
  //     this.ctx.stroke();
  //   }
  // }

  handleObstacleCollisions() {
    for (let i = 0; i < this.obstacles.length; i++) {
      for (let j = 0; j < this.enemies.length; j++) {
        if (this.enemies[j].collidedWith(this.obstacles[i])) {
          if (i === 0) {
            return //enemies ignore the top block
          }
          this.enemies[j].moveAwayFromObject(this.obstacles[i]);
        }
      }
      if (this.link.collidedWith(this.obstacles[i])) {
        this.link.moveAwayFromObject(this.obstacles[i])
      }
    }
  }

  makeEnemy() {
    if (Date.now() - this.oldTime > 2000 && this.enemies.length < 6 && !this.isGameOver) {
      this.enemies.push(new _moblin_js__WEBPACK_IMPORTED_MODULE_1__["default"](this.canvas, this.ctx, this.enemySpawnPos()));
      this.oldTime = Date.now();
    }
  }

  dropItem(position) {
    const roll = Math.random()*10;
    if (roll < 1) {
      this.items.push(new _heart_item_js__WEBPACK_IMPORTED_MODULE_5__["default"](this.canvas, this.ctx, position, 1))
    } else if (roll >= 1 && roll < 3) {
      const amount = [1, 5, 10][Math.floor(Math.random()*3)]
      this.items.push(new _arrow_item_js__WEBPACK_IMPORTED_MODULE_4__["default"](this.canvas, this.ctx, position, amount))
    } else {
      return
    }
  }

  updateEnemies() {
    for (let i = 0; i < this.enemies.length; i++) {
      this.handleDestroyed(this.enemies[i], i);
      if (this.enemies[i]) {
        this.enemies[i].move(this.link);
        this.checkDealtDamage(this.enemies[i]);
        this.checkAttacked(this.enemies[i]);
        this.checkArrowHits(this.enemies[i]);
      }
    }
  }

  handleDestroyed(enemy, idx) {
    if (enemy.isFullyDestroyed()) {
      this.dropItem(
        [enemy.position[0] + (enemy.scaledWidth/2),
          enemy.position[1] + (enemy.scaledHeight/2)]
      )
      this.enemies.splice(idx, 1);
      this.score++;
    }
  }

  checkDealtDamage(enemy) {
    if (this.link.collidedWith(enemy) && this.link.invincible === false && enemy.poofing === false) {
      this.link.damaged();
      if (this.link.life === 0) {
        this.isGameOver = true;
      }
    }
  }

  checkAttacked(enemy) {
    if (this.link.attackedObject(enemy)) {
      if (enemy.life <= 1) {
        enemy.enemyDeathSound.play();
        enemy.dead = true;
        enemy.poofing = true;
      } else {
        enemy.damaged();
        enemy.recoil(this.link.currentDirection);
      }
    }
  }

  checkArrowHits(enemy) {
    for (let j = 0; j < this.arrows.length; j++) {
      if (enemy.collidedWith(this.arrows[j])) {
        this.arrowHitSound.play();
        if (enemy.life <= 1) {
          enemy.enemyDeathSound.play();
          enemy.dead = true;
          enemy.poofing = true;
        } else {
          enemy.damaged();
          enemy.recoil(this.arrows[j].direction);
        }
        this.arrows.splice(j, 1);
      }
    }
  }

  drawEnemies() {
    for (let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].draw();
    }
  }

  drawItems() {
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].draw();
    }
  }

  updateItems() {
    for (let i = 0; i < this.items.length; i++) {
      if (Date.now() - this.items[i].spawnTime > 10000) {
        this.items.splice(i, 1);
      }

      if (this.items[i]) {
        if (this.link.collidedWith(this.items[i])) {
          this.link.pickUpItem(this.items[i]);
          this.items.splice(i, 1);
        }
      }
    }
  }

  makeArrow() {
    if (this.link.firingBow) {
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

        this.arrows.push(new _arrow_js__WEBPACK_IMPORTED_MODULE_3__["default"](this.canvas, this.ctx, startPos, this.link.currentDirection));
        this.link.ammo -= 1;
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
    const spawnPoint = Math.floor(Math.random()*5);
    switch (spawnPoint) {
      case 0:
        return [-50, (104 + Math.random()*21)*2] //left side
      case 1:
        return [this.canvas.width+50, (110 + Math.random()*20)*2] //right side
      case 2:
        return [(96 + Math.random()*63)*2, this.canvas.height+ 50] //bottom side
      case 3:
        return [111*2, 13*2] //left log
      case 4:
        return [223*2, 13*2] //right log
    }
  }

  avoidOverlap() {
    for (let i = 0; i < this.enemies.length-1; i++) {
      for (let j = i+1; j < this.enemies.length; j++) {
        if (this.enemies[i].collidedWith(this.enemies[j])) {
          this.enemies[i].moveAwayFromEnemy(this.enemies[j])
          this.enemies[j].moveAwayFromEnemy(this.enemies[i])
        }
      }
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Game);


/***/ }),

/***/ "./lib/heart_item.js":
/*!***************************!*\
  !*** ./lib/heart_item.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./item */ "./lib/item.js");


class HeartItem extends _item__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(canvas, ctx, pos, value) {
    super(canvas, ctx, pos);
    this.heartItem = new Image();
    this.heartItem.src = './assets/items-overworld.png';
    this.width = 14;
    this.height = 13;
    this.weight = 10;
    this.scale = 2
  }

  hitbox() {
    return {
      x: this.position[0],
      y: this.position[1],
      width: this.width*this.scale,
      height: this.height*this.scale,
    }
  };

  draw() {
    if (this.flashing) {
      this.flashFrameCount++
      if (this.flashFrameCount < 5) {
        return;
      }
      this.flashFrameCount = 0;
    }
    this.ctx.drawImage(
      this.heartItem,
      273,
      58,
      this.width,
      this.height,
      this.position[0],
      this.position[1],
      this.width*this.scale,
      this.height*this.scale,
    )
  }

}

/* harmony default export */ __webpack_exports__["default"] = (HeartItem);


/***/ }),

/***/ "./lib/info.js":
/*!*********************!*\
  !*** ./lib/info.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Info {
  constructor(canvas, ctx, game) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.game = game;
    this.heart = new Image();
    this.heart.src = './assets/items-overworld.png';
    this.bow = new Image();
    this.bow.src = './assets/items-overworld.png';

    this.draw = this.draw.bind(this);
    this.loop = this.loop.bind(this);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    const score = `Score: ${this.game.score}`;
    this.ctx.font = '40px returnofganon';
    this.ctx.fillStyle = 'white';
    this.ctx.textAlign = 'left';

    this.drawHearts();
    this.drawBow();
    this.ctx.fillText(score, 10, 120);
  }

  drawHearts() {
    const life = this.game.link.life;
    for (let i = 0; i < life; i++) {
      this.ctx.drawImage(
        this.heart,
        273,
        58,
        14,
        13,
        10 + i*35,
        15,
        28,
        26,
      )
    }
  }

  drawBow() {
    const arrows = `: ${this.game.link.ammo}`;
    this.ctx.drawImage(
      this.bow,
      173,
      9,
      15,
      15,
      10,
      50,
      30,
      30,
    )
    this.ctx.fillText(arrows, 45, 79)
  }

  loop() {
    this.draw();
    window.requestAnimationFrame(this.loop);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Info);


/***/ }),

/***/ "./lib/item.js":
/*!*********************!*\
  !*** ./lib/item.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Item {
  constructor(canvas, ctx, pos) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.position = pos;
    this.scale = 2.6;
    this.itemGetSound = new Audio('./assets/LTTP_Item.wav');
    this.spawnTime = Date.now();
    this.flashing = false;

    setTimeout(() => {this.flashing = true;}, 7000)
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Item);


/***/ }),

/***/ "./lib/link.js":
/*!*********************!*\
  !*** ./lib/link.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _arrow_item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrow_item */ "./lib/arrow_item.js");
/* harmony import */ var _heart_item_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./heart_item.js */ "./lib/heart_item.js");



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
  "attackRight": [242, 268, 295, 327, 359],
  "attackLeft": [242, 268, 295, 327, 359],
  "attackDown": [1, 30, 61, 91, 115, 145],
  "attackUp": [0, 30, 60, 88, 115],
}

const ATTACK_Y = {
  "attackRight": [180, 180, 181, 181, 176],
  "attackLeft": [90, 90, 91, 91, 86],
  "attackDown": [90, 90, 86, 86, 87, 88],
  "attackUp": [174, 177, 174, 177, 180],
}

const ATTACK_WIDTHS = {
  "attackRight": [18, 26, 31, 28, 23],
  "attackLeft": [18, 26, 31, 28, 23],
  "attackDown": [20, 22, 20, 20, 28, 32],
  "attackUp": [21, 21, 21, 24, 35],
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

const spin_directions = ["spinRight", "spinLeft", "spinDown", "spinUp"];

const SPIN_SPRITES = {
  "spinRight": [
    [879, 103, 23, 23],
    [835, 103, 31, 23],
    [791, 104, 34, 23],
    [747, 103, 34, 23],
    [715, 103, 23, 23],
    [689, 103, 16, 31],
    [656, 103, 28, 23],
    [624, 103, 28, 23],
    [596, 97, 17, 29],
    [559, 103, 28, 22],
    [529, 103, 28, 23],
    [500, 103, 23, 23],
  ],
  "spinLeft": [
    [500, 19, 23, 23],
    [536, 19, 31, 23],
    [577, 20, 34, 23],
    [621, 19, 34, 23],
    [664, 19, 23, 23],
    [697, 19, 16, 31],
    [718, 19, 28, 23],
    [749, 19, 29, 23],
    [789, 13, 18, 29],
    [815, 19, 28, 23],
    [845, 19, 28, 23],
    [879, 19, 23, 23],
  ],
  "spinDown": [
    [504, 139, 20, 26],
    [532, 126, 15, 36],
    [554, 126, 16, 39],
    [576, 138, 20, 26],
    [604, 142, 28, 22],
    [638, 142, 28, 22],
    [673, 141, 17, 31],
    [695, 142, 28, 22],
    [729, 142, 28, 22],
    [764, 136, 16, 28],
    [791, 138, 20, 26],
    [818, 142, 16, 22],
  ],
  "spinUp": [
    [487, 60, 20, 27],
    [516, 61, 15, 35],
    [541, 60, 17, 38],
    [568, 60, 17, 38],
    [595, 60, 20, 27],
    [620, 60, 28, 22],
    [657, 54, 16, 28],
    [681, 60, 28, 22],
    [720, 60, 16, 31],
    [746, 61, 17, 31],
    [767, 61, 20, 27],
    [797, 61, 17, 22],
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
    this.width = 20;
    this.height = 25;
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
    this.ammo = 5;
    this.life = 3;
    this.right = false;
    this.left = false;
    this.down = false;
    this.up = false;

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
    if (this.currentDirection === 0) {
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
    this.stunned = true;
    this.invincible = true;
    this.linkHurtSound.play();
    // this.link.recoil();
    this.life -= 1;
    setTimeout(() => {this.stunned = false;}, 500) //stunned after hit
    setTimeout(() => {this.invincible = false;}, 2000) //invincible for short time after getting hit
  }

  invincibility() {
    if (this.invincible) {
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
    if (this.walking) {
      let numFrames = WALK_X[directions[this.currentDirection]].length
      let cycleLoop = Array.from({length: numFrames}, (x,i) => i);

      if (this.frameCount < 3) {
        this.drawWalkFrame(
          directions[this.currentDirection],
          cycleLoop[this.currentLoopIndex],
        );
        this.frameCount++
        return
      }
      // this.frameCount = 0;
    //   this.currentLoopIndex++;
    //   if (this.currentLoopIndex >= numFrames) {
    //     this.currentLoopIndex = 0;
    //   this.drawWalkFrame(
    //     directions[this.currentDirection],
    //     cycleLoop[this.currentLoopIndex],
    //   );
    //   }
    //
    // }
      this.frameCount = 0;
      this.currentLoopIndex++;
      if (this.currentLoopIndex >= numFrames) {
        this.currentLoopIndex = 0;
      }
      this.drawWalkFrame(
        directions[this.currentDirection],
        this.currentLoopIndex,
      );
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
    if (this.stunned || this.attacking) {
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
    if (this.attacking) {
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
    }
  }

  drawBowFrame(frame) {
    this.ctx.drawImage(
      this.link2,
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

  fireBow() {
    if (this.firingBow) {
      let allFrames = BOW_SPRITES[bow_directions[this.currentDirection]]
      let numFrames = allFrames.length
      if (this.bowFrameCount < 8) {
        this.drawBowFrame(allFrames[this.bowCurrentLoopIndex]),
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
      this.drawBowFrame(allFrames[this.bowCurrentLoopIndex]);
    }
  }

  useBow(e) {
    e.preventDefault();
    if ((this.stunned || this.firingBow || this.attacking || this.walking || this.spinning)) {
      return;
    }
    if (this.keys[66] && this.ammo > 0) {
      this.arrowShootSound.play();
      this.firingBow = true;
    }
  }

  spin(e) {
    e.preventDefault();
    if ((this.stunned || this.firingBow || this.attacking || this.walking || this.spinning)) {
      return;
    }
    if (this.keys[86]) {
      this.spinning = true;
    }
  }

  spinAttack() {
    if (this.spinning) {
      let allFrames = SPIN_SPRITES[spin_directions[this.currentDirection]]
      let numFrames = allFrames.length
      if (this.spinFrameCount < 2) {
        this.drawSpinFrame(allFrames[this.spinCurrentLoopIndex], this.spinCurrentLoopIndex),
        this.spinFrameCount++;
        return;
      }
      this.spinFrameCount = 0;
      this.spinCurrentLoopIndex++;
      if (this.spinCurrentLoopIndex >= numFrames) {
        this.spinCurrentLoopIndex = 0
        this.spinning = false;
        return
      }
      this.drawSpinFrame(allFrames[this.spinCurrentLoopIndex], this.spinCurrentLoopIndex);
    }
  }

  drawSpinFrame(frame, frameCount) {
    let spinPosX = this.position[0] + SPIN_POS_OFFSET[spin_directions[this.currentDirection]][frameCount][0]*this.scale;
    let spinPosY = this.position[1] + SPIN_POS_OFFSET[spin_directions[this.currentDirection]][frameCount][1]*this.scale;
    this.ctx.drawImage(
      this.link2,
      frame[0],
      frame[1],
      frame[2],
      frame[3],
      spinPosX,
      spinPosY,
      frame[2]*this.scale,
      frame[3]*this.scale,
    )
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
    if ((this.walking || this.attacking || this.firingBow || this.spinning) === false) {
      this.drawStand();
    }
  }

  pickUpItem(item) {
    this.getItemSound.play();
    if (item instanceof _arrow_item__WEBPACK_IMPORTED_MODULE_0__["default"]) {
      this.ammo += item.value;
    } else if (item instanceof _heart_item_js__WEBPACK_IMPORTED_MODULE_1__["default"] && this.life <= 5) {
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

/* harmony default export */ __webpack_exports__["default"] = (Link);


/***/ }),

/***/ "./lib/moblin.js":
/*!***********************!*\
  !*** ./lib/moblin.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _enemy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enemy */ "./lib/enemy.js");


const moblin_directions = ["walkRight", "walkLeft", "walkDown", "walkUp"];

const MOBLIN_SPRITES = {
  "walkRight": [
    [160, 0, 24, 26],
    [160, 40, 24, 26],
    // [160, 80, 24, 26],
  ],
  "walkLeft": [
    [222, 14, 24, 26],
    [222, 54, 24, 26],
    // [222, 94, 24, 26],
  ],
  "walkDown": [
    [124, 0, 17, 32],
    [124, 38, 17, 32],
    // [123, 81, 17, 32],
  ],
  "walkUp": [
    [203, 0, 18, 28],
    [203, 40, 18, 28],
    // [203, 80, 18, 30],
  ],
};

class Moblin extends _enemy__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(canvas, ctx, pos) {
    super(canvas, ctx, pos);
    this.currentDirection = 2;
    this.moblin = new Image();
    this.moblin.src = './assets/enemies.png';
    this.currentLoopIndex = 0;
    this.frameCount = 0;
    this.width = 24;
    this.height = 26;
    this.life = 2;
    this.scale = 2.6;
    this.speed = .1 + Math.random();
    this.scaledWidth = this.width*this.scale;
    this.scaledHeight = this.height*this.scale;
  }

  hitbox() {
    return {
      x: this.position[0],
      y: this.position[1],
      width: this.scaledWidth,
      height: this.scaledHeight,
    }
  };

  move(player) {
    this.moveTowardsObject(player)
  }

  step() {
    if (this.poofing) {
      return
    }
    let allFrames = MOBLIN_SPRITES[moblin_directions[this.currentDirection]]
    let numFrames = allFrames.length;
    if (this.frameCount < 8) {
      this.drawWalkFrame(allFrames[this.currentLoopIndex])
      this.frameCount++;
      return
    }
    this.frameCount = 0;
    this.currentLoopIndex++;
    if (this.currentLoopIndex >= numFrames) {
      this.currentLoopIndex = 0;
    }
    this.drawWalkFrame(allFrames[this.currentLoopIndex])
  }

  drawWalkFrame(frame) {
    this.ctx.drawImage(
      this.moblin,
      frame[0],
      frame[1],
      frame[2],
      frame[3],
      this.position[0],
      this.position[1],
      this.scale*frame[2],
      this.scale*frame[3],
    )
    // this.ctx.beginPath();
    // this.ctx.rect(this.position[0], this.position[1], this.scaledWidth, this.scaledHeight)
    // this.ctx.lineWidth = 1
    // this.ctx.strokeStyle = 'yellow';
    // this.ctx.stroke();
  }

  draw() {
    if (this.flashing) {
      this.flashFrameCount++
      if (this.flashFrameCount < 5) {
        return;
      }
      this.flashFrameCount = 0;
    }
    this.step();
    this.poof();
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Moblin);


/***/ }),

/***/ "./lib/obstacle.js":
/*!*************************!*\
  !*** ./lib/obstacle.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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

/* harmony default export */ __webpack_exports__["default"] = (Obstacle);


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
/* harmony import */ var _info_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./info.js */ "./lib/info.js");



document.addEventListener('DOMContentLoaded', ()=> {
  const mainCanvas = document.getElementsByClassName('game-canvas')[0];
  const infoCanvas = document.getElementsByClassName('info-canvas')[0];
  const ctx = mainCanvas.getContext('2d');
  const ctxInfo = infoCanvas.getContext('2d');


  const game = new _game_js__WEBPACK_IMPORTED_MODULE_0__["default"](mainCanvas, ctx);
  const info = new _info_js__WEBPACK_IMPORTED_MODULE_1__["default"](infoCanvas, ctxInfo, game)
  game.openMenu();
  info.loop();
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
    this.currentDirection = 0;
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
      width: 24*this.scale,
      height: 22*this.scale,
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