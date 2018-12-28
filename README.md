# Legend of Schmelda

# Overview

Legend of Schmelda is a 2-D combat game based on Legend of Zelda. The player controls a hero who will fight off waves of enemies until their life runs out.

# Instructions and Controls

Instructions

The goal of the game is to kill as many enemies as possible until your life is zero. Swing the sword and shoot your bow to defeat them! Enemies killed have a chance to drop extra health as well as arrows for your bow.

Controls
* WASD to move around the screen
* H to swing the sword
* B to shoot the bow

# Features and Implementation

This project uses Javascript for game logic and HTML5 Canvas to render the images.

The main game loop function continuously updates the attributes of all objects in the game, renders the images on the canvas object, and calls window.requestAnimationFrame on the loop function until the game is over.

```
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
  this.makeEnemy();
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
```

Collisions and Hitboxes

Objects include the player, enemies, arrows, enemies, and items. Each object has a hitbox attribute which is used to store the location and boundaries of the object. Collisions between objects are detected using a collidedWith function. For example, enemies have the following collision function:

```
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
```

Sword collisions are handled similarly, except the damaging area is represented by a "hurtbox" that only appears when the player is swinging the sword.

# Future Directions

* Additional levels
* Different enemies
* More items and abilities
