import Obstacle from './obstacle.js';

const OBSTACLES = {
  1: [
    [[0, 0], 355, 23],
    [[0, 32], 25, 72],
    [[0, 193], 79, 48],
    [[0, 241], 96, 11],
    [[329, 29], 26, 72],
    [[268, 195], 87, 57],
    [[252, 244], 16, 8],
  ],
  2: [
    [[0, 0], 0, 0],
  ]
}

class Level {
  constructor (currentLevel) {
    this.level = currentLevel;
    this.obstacles = [];
    this.enemies = [];
  }

  makeObstacles () {
    OBSTACLES[this.level].forEach ((obstacle) => {
      this.obstacles.push(new Obstacle(obstacle[0], obstacle[1], obstacle[2]))
    })
    return this.obstacles;
  }

  makeEnemies () {

  }
}

export default Level
