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

export default Info;
