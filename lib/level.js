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
    [[100, 100], 20, 20],
  ]
}

class Level {
  constructor (currentLevel) {
    this.level = currentLevel;
  }

  makeObstacles (obstacles) {
    OBSTACLES[this.level].forEach ((obstacle) => {
      obstacles.push(new Obstacle(obstacle[0], obstacle[1], obstacle[2]))
    })
  }
}

export default Level
