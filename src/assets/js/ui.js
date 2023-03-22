export class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = "30px";
    this.fontFamily = "Helvetical";
  }

  draw(ctx) {
    ctx.save();
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowColor = "white";
    ctx.shadowBlur = 0;

    ctx.font = this.fontSize + " " + this.fontFamily;
    ctx.textAllign = "left";
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + this.game.score, 20, 50);

    ctx.font = this.fontSize + " " + this.fontFamily;
    ctx.fillText("Time: " + (this.game.time * 0.001).toFixed(1), 20, 80);

    if (this.game.gameOver) {
      ctx.textAllign = "left";
      ctx.font = this.fontSize + " " + this.fontFamily;
      ctx.fillText(
        "Game Over, press Enter to restart!",
        this.game.width * 0.5,
        this.game.height * 0.5
      );
    }
    ctx.restore();
  }
}
