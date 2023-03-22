import { ExplosionAnimation } from "./collisionAnimation.js";
import {
  SittingState,
  RunningState,
  JumpingState,
  FallingState,
  RollingState,
  DivingState,
  HitState,
} from "./playerState.js";

export class Player {
  constructor(game) {
    this.game = game;
    this.width = 100;
    this.height = 91.3;
    this.y = this.game.height - this.height - this.game.groundMargin;
    this.x = 0;
    this.image = document.getElementById("player");
    this.speed = 0;
    this.maxSpeed = 10;
    this.gravity = 1;
    this.vy = 0;
    this.maxVy = 20;
    this.frameX = 0;
    this.frameY = 0;
    this.frameTimer = 0;
    this.maxFrame = 0;
    this.fps = 20;
    this.intervalFrame = 1000 / this.fps;
    this.states = [
      new SittingState(this.game),
      new RunningState(this.game),
      new JumpingState(this.game),
      new FallingState(this.game),
      new RollingState(this.game),
      new DivingState(this.game),
      new HitState(this.game),
    ];
  }

  update(input, deltatime) {
    this.checkCollission();
    this.currentState.handleInput(input);

    this.x += this.speed;
    if (input.includes("ArrowRight") && this.currentState !== this.states[6]) {
      this.speed = this.maxSpeed;
    } else if (input.includes("ArrowLeft") && this.currentState !== this.states[6]) {
      this.speed = -this.maxSpeed;
    } else {
      this.speed = 0;
    }

    if (this.x < 0) {
      this.x = 0;
    }
    if (this.x > this.game.width - this.width) {
      this.x = this.game.width - this.width;
    }

    this.y += this.vy;

    if (!this.onGorund()) {
      this.vy += this.gravity;
    } else {
      this.vy = 0;
    }

    if (this.y > this.game.height - this.height - this.game.groundMargin) {
      this.y = this.game.height - this.height - this.game.groundMargin;
    }

    if (this.frameTimer > this.intervalFrame) {
      if (this.frameX < this.maxFrame) {
        this.frameX++;
      } else {
        this.frameX = 0;
      }
    }

    this.frameTimer += deltatime;
  }

  onGorund() {
    return this.y >= this.game.height - this.height - this.game.groundMargin;
  }

  setState(state, speed) {
    this.currentState = this.states[state];
    this.game.speed = speed * this.game.maxSpeed;
    this.currentState.enter();
  }

  checkCollission() {
    this.game.enemies.forEach((e) => {
      if (
        e.x < this.x + this.width &&
        e.x + e.width > this.x &&
        e.y < this.y + this.height &&
        e.y + e.height > this.y
      ) {
        e.markedForDeletion = true;
        this.game.collissions.push(
          new ExplosionAnimation(
            this.game,
            e.x + e.width * 0.5,
            e.y + e.height * 0.5
          )
        );
        if (
          this.currentState === this.states[4] ||
          this.currentState === this.states[5]
        ) {
          this.game.score++;
        } else {
          this.setState(6, 0);
        }
      }
    });
  }

  draw(ctx) {
    if (this.game.debug) {
      ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
    ctx.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
