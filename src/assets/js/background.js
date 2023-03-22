class Layer {
  constructor(game, width, height, speedModifier, image) {
    this.game = game;
    this.width = width;
    this.height = height;
    this.x = 0;
    this.y = 0;
    this.image = image;
    this.speedModifier = speedModifier;
    this.speed = this.speedModifier * this.game.speed;
  }
  update() {
    this.speed = this.speedModifier * this.game.speed;

    if (this.x < -this.width) {
      this.x = 0;
    }

    this.x -= this.speed;
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.image,
      this.x + this.width - this.speed,
      this.y,
      this.width,
      this.height
    );
  }
}

export class Background {
  constructor(game) {
    this.game = game;
    this.width = 1667;
    this.height = 500;

    this.layers = [
      new Layer(
        this.game,
        this.width,
        this.height,
        0.2,
        document.getElementById("layer1")
      ),
      new Layer(
        this.game,
        this.width,
        this.height,
        0.4,
        document.getElementById("layer2")
      ),
      new Layer(
        this.game,
        this.width,
        this.height,
        0.6,
        document.getElementById("layer3")
      ),
      new Layer(
        this.game,
        this.width,
        this.height,
        0.8,
        document.getElementById("layer4")
      ),
      new Layer(
        this.game,
        this.width,
        this.height,
        1,
        document.getElementById("layer5")
      ),
    ];
  }

  update() {
    this.layers.forEach((l) => l.update());
  }

  draw(ctx) {
    this.layers.forEach((l) => l.draw(ctx));
  }
}
