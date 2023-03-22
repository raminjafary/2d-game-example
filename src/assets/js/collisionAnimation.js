export class ExplosionAnimation {
  constructor(game, x, y) {
    this.game = game;
    this.frameX = 0;
    this.maxFrame = 4;
    this.spriteWidth = 100;
    this.spriteHeight = 90;
    this.width = this.spriteWidth * Math.random() + 0.5;
    this.height = this.spriteHeight * Math.random() + 0.5;
    this.x = x - this.width * 0.5;
    this.y = y - this.height * 0.5;
    this.sound = new Audio();
    this.sound.src = "../assets/audio/Ice attack 2.wav";
    this.image = document.getElementById("boom");
    this.markedForDeletion = false;
    this.fps = Math.random() * 10 + 5;
    this.interval = 1000 / this.fps;
    this.timer = 0;
  }

  update(deltatime) {
    // if (this.frameX === 0) this.sound.play();

    this.x -= this.game.speed;

    if (this.timer > this.interval) {
      this.frameX++;
      this.timer = 0;
    } else {
      this.timer += deltatime;
    }

    if (this.frameX > this.maxFrame) this.markedForDeletion = true;
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.spriteWidth * this.frameX,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
