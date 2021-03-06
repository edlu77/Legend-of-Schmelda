import Wallmaster from './wallmaster.js';
import Moblin from './moblin.js';
import Ganon from './ganon.js';
import Link from './link.js';
import Arrow from './arrow.js';
import ArrowItem from './arrow_item.js';
import HeartItem from './heart_item.js';
import Obstacle from './obstacle.js';
import Info from './info.js';
import Level from './level.js';
import Entrance from './entrance.js';

class Game {
  constructor(canvas, ctx) {
    this.enemies = [];
    this.obstacles = [];
    this.link = new Link(canvas, ctx);
    this.ctx = ctx;
    this.canvas = canvas;
    this.arrows = [];
    this.items = [];
    this.oldTime = Date.now();
    this.oldArrowTime = Date.now();
    this.isGameOver = false;
    this.score = 0;
    this.canRestart = false;
    this.currentMusic = null;
    this.musicMuted = false;
    this.currentLevel = 1;
    this.nextLevelOpen = false;
    this.entrance = new Entrance([340, 50], this.ctx)
    this.bossSpawned = false;
    this.bossKilled = false;

    this.mainMenuTheme = new Audio('./assets/Name_Entry.mp3');
    this.hyruleTheme = new Audio('./assets/Hyrule_Field.mp3');
    this.gameOverTheme = new Audio('./assets/Kakariko_Village.mp3');
    this.arrowHitSound = new Audio('./assets/LTTP_Arrow_Hit.wav');
    this.startGameSound = new Audio('./assets/LTTP_Secret.wav');
    this.dungeonTheme = new Audio('./assets/Dungeon_Theme_02.mp3');

    this.draw = this.draw.bind(this);
    this.loop = this.loop.bind(this);
    this.makeEnemy = this.makeEnemy.bind(this);
    this.makeArrow = this.makeArrow.bind(this);
    this.startGame = this.startGame.bind(this);
    this.playTheme = this.playTheme.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.muteMusic = this.muteMusic.bind(this);
    this.onMusic = this.onMusic.bind(this);
    this.makeLevel = this.makeLevel.bind(this);
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
    let mainMenu = document.getElementsByClassName('main-menu')[0];
    mainMenu.className = 'main-menu close';
    let gameOver = document.getElementsByClassName('game-over')[0];
    gameOver.className = 'game-over close';
    let win = document.getElementsByClassName('win')[0];
    win.className = 'win close';
    let gameWindow = document.getElementsByClassName('game-window')[0];
    gameWindow.className = 'game-window';
  }

  playTheme() {
    if (!this.musicMuted) {
      this.currentMusic.play();
    }
  }

  startGame() {
    this.isGameOver = false;
    this.bossSpawned = false;
    this.canRestart = false;
    this.bossKilled = false;
    this.arrows = [];
    this.items = [];
    this.enemies = [];
    this.score = 0;
    this.oldTime = Date.now();
    this.link = new Link(this.canvas, this.ctx);
    this.currentMusic = this.hyruleTheme;
    this.currentLevel = 1;
    this.nextLevelOpen = false;
    setTimeout(this.playTheme, 1000);
    this.combineListeners();
    this.loop();
  }

  stopGame() {
    this.enemies = [];
    this.items = [];
    this.arrows = [];
    const gameWindow = document.getElementsByClassName('game-window')[0] ? document.getElementsByClassName('game-window')[0] : document.getElementsByClassName('game-window-2')[0];
    gameWindow.className = 'game-window close';
  }

  gameOver() {
    if (this.bossKilled) {
      this.isGameOver = true;
      this.canRestart = true;
      this.stopGame();
      const win = document.getElementsByClassName('win')[0];
      win.className = 'win';
      this.currentMusic.pause();
      this.currentMusic = this.gameOverTheme;
      this.playTheme();
    } else {
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
  }

  restartGame(e) {
    if (this.canRestart) {
      if (e.target.className === "restart-button") {
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
    // document.addEventListener('keydown', this.link.spin); //enable spinning
    document.addEventListener('click', this.restartGame);

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
    this.makeEnemy();
    this.updateEnemies();
    this.avoidOverlap();
    this.updateArrows();
    this.makeArrow();
    this.updateItems();
    this.gameOver();
    this.makeLevel();
    this.openNextLevel();
    this.spawnBoss();
    this.updateObstacles();
    this.handleObstacleCollisions();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.link.draw();
    this.drawEnemies();
    this.drawArrows();
    this.drawItems();
    this.drawEntrance();
    // this.drawObstacles();
  }


  drawObstacles() {
    for (var i = 0; i < this.obstacles.length; i++) {
      this.ctx.beginPath();
      this.ctx.rect(this.obstacles[i].hitbox().x, this.obstacles[i].hitbox().y, this.obstacles[i].hitbox().width, this.obstacles[i].hitbox().height)
      this.ctx.lineWidth = 1
      this.ctx.strokeStyle = 'yellow';
      this.ctx.stroke();
    }
  }

  handleObstacleCollisions() {
    for (let i = 0; i < this.obstacles.length; i++) {
      for (let j = 0; j < this.enemies.length; j++) {
        if (this.enemies[j].collidedWith(this.obstacles[i])) {
          this.enemies[j].moveAwayFromObject(this.obstacles[i]);
        }
      }
      if (this.link.collidedWith(this.obstacles[i])) {
        if (this.obstacles[i] === this.entrance) {
          this.moveToNextLevel();
        } else {
          this.link.moveAwayFromObject(this.obstacles[i])
        }
      }
    }
  }

  makeEnemy() {
    let additionalSpeed = 0;
    if (Date.now() - this.oldTime > 1800 && this.enemies.length < 4 && !this.isGameOver && this.currentLevel === 1) {
      if (this.score >= 5) {
        additionalSpeed = .1;
      } else if (this.score >= 10) {
        additionalSpeed = .2;
      } else if (this.score >= 15) {
        additionalSpeed = .3;
      } else if (this.score >= 20) {
        additionalSpeed = .4;
      } else if (this.score >= 25) {
        additionalSpeed = .5;
      } else {
        additionalSpeed = 0;
      }
      let moblin = new Moblin(this.canvas, this.ctx, this.enemySpawnPos());
      moblin.speed += additionalSpeed;
      this.enemies.push(moblin);
      this.oldTime = Date.now();
    }
  }

  dropItem(position) {
    const roll = Math.random()*10;
    if (roll < 3) {
      this.items.push(new HeartItem(this.canvas, this.ctx, position, 1))
    } else if (roll >= 3 && roll < 6) {
      const amount = [1, 5, 10][Math.floor(Math.random()*3)]
      this.items.push(new ArrowItem(this.canvas, this.ctx, position, amount))
    } else {
      return
    }
  }

  updateEnemies() {
    if (this.bossSpawned && this.bossKilled === false) {
      if (this.enemies[0].dead) {
        this.bossKilled = true;
        this.enemies = [this.enemies[0]];
      } else {
        this.enemies = [this.enemies[0]].concat(this.enemies[0].fire)
      }
    }

    for (let i = 0; i < this.enemies.length; i++) {
      this.handleDestroyed(this.enemies[i], i);
      if (this.enemies[i]) {
        this.enemies[i].attack();
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
    if (this.link.attackedObject(enemy) && !enemy.invincible) {
      if (enemy.life - this.link.attackValue <= 0) {
        enemy.enemyDeathSound.play();
        enemy.dead = true;
        enemy.poofing = true;
      } else {
        enemy.damaged(this.link.attackValue);
        enemy.recoil(this.link.attackDirection);
      }
    }
  }

  checkArrowHits(enemy) {
    for (let j = 0; j < this.arrows.length; j++) {
      if (enemy.collidedWith(this.arrows[j])) {
        if (enemy.invincible) {
          this.arrows.splice(j, 1);
          return
        } else {
          this.arrowHitSound.play();
          if (enemy.life <= 0) {
            enemy.enemyDeathSound.play();
            enemy.dead = true;
            enemy.poofing = true;
          } else {
            enemy.damaged(this.link.attackValue);
            enemy.recoil(this.arrows[j].direction);
          }
        this.arrows.splice(j, 1);
        }
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
        this.link.arrowShootSound.play();
        this.arrows.push(new Arrow(this.canvas, this.ctx, startPos, this.link.currentDirection));
        this.link.ammo -= 1;
      }
    }
  }

  arrowLimit() {
    if (Date.now() - this.oldArrowTime < 500) {
      return true
    }
    this.oldArrowTime = Date.now();
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

  makeLevel() {
    let currentLevel = new Level(this.currentLevel);
    if (!this.link.entering) {
      this.obstacles = currentLevel.makeObstacles();
    };
  }

  openNextLevel() {
    if (this.score === 10 && this.nextLevelOpen === false) {
      this.startGameSound.play();
      this.nextLevelOpen = true;
    }
  }

  drawEntrance() {
    if (this.nextLevelOpen && this.currentLevel === 1) {
      this.entrance.draw();
    }
  }

  moveToNextLevel() {
    const gameWindow = document.getElementsByClassName('game-window')[0];
    if (this.link.collidedWith(this.entrance) && this.currentLevel === 1 && this.nextLevelOpen) {
      gameWindow.className = 'game-window-2';
      this.currentLevel = 2;
      this.currentMusic.pause();
      this.currentMusic = this.dungeonTheme;
      this.playTheme();
      this.enemies = [];
      for (let i = 0; i <= 6; i++) {
        this.enemies.push(new Wallmaster(this.canvas, this.ctx, [100 + i*60, 300]))
      }
      this.items = [];
      this.arrows = [];
      this.obstacles = [];
      this.link.position = [335, 56];
      this.link.currentDirection = 2;
      this.link.entering = true;
      setTimeout(() => {this.link.entering = false;}, 300);
    }
  }

  spawnBoss() {
    if (this.currentLevel === 2 && this.enemies.length === 0 && this.bossKilled === false) {
      this.bossSpawned = true;
      this.enemies.push(new Ganon(this.canvas, this.ctx, [300, 250]));
    }
  }

  updateObstacles() {
    if (this.nextLevelOpen && this.currentLevel === 1) {
      this.obstacles.push(this.entrance);
    }
  }
}

export default Game;
