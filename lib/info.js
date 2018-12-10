class Info {
  constructor(canvas, ctx, game) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.game = game;

    this.draw = this.draw.bind(this);
    this.loop = this.loop.bind(this);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    const life = `Life: ${this.game.link.life}`;
    const arrows = `Arrows: ${this.game.link.ammo}`;
    const score = `Score: ${this.game.score}`;
    this.ctx.font = '40px returnofganon';
    this.ctx.fillStyle = 'white';
    this.ctx.textAlign = 'left';
    this.ctx.fillText(life, 10, 40);
    this.ctx.fillText(arrows, 10, 80);
    this.ctx.fillText(score, 10, 120);
  }

  loop() {
    this.draw();
    window.requestAnimationFrame(this.loop);
  }
}

export default Info;
