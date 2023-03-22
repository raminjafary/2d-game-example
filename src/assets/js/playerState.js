import { DustParticle, FireParticle, SplashParticle } from "./particle.js";

const States = {
  SITTING: 0,
  RUNNING: 1,
  JUMPING: 2,
  FALLING: 3,
  ROLLING: 4,
  DIVING: 5,
  HITI: 6,
};

class State {
  constructor(state, game) {
    this.state = state;
    this.game = game;
  }
}

export class SittingState extends State {
  constructor(game) {
    super("Sitting", game);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 4;
    this.game.player.frameY = 5;
  }

  handleInput(input) {
    if (input.includes("ArrowRight") || input.includes("ArrowLeft")) {
      this.game.player.setState(States.RUNNING, 1);
    } else if (input.includes("Enter")) {
      this.game.player.setState(States.ROLLING, 2);
    }
  }
}

export class RunningState extends State {
  constructor(game) {
    super("RUNNING", game);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 6;
    this.game.player.frameY = 3;
  }

  handleInput(input) {
    this.game.particles.unshift(
      new DustParticle(
        this.game,
        this.game.player.x + this.game.player.width * 0.6,
        this.game.player.y + this.game.player.height
      )
    );

    if (input.includes("ArrowDown")) {
      this.game.player.setState(States.SITTING, 0);
    } else if (input.includes("ArrowUp")) {
      this.game.player.setState(States.JUMPING, 1);
    } else if (input.includes("Enter")) {
      this.game.player.setState(States.ROLLING, 2);
    }
  }
}

export class JumpingState extends State {
  constructor(game) {
    super("JUMPING", game);
  }

  enter() {
    if (this.game.player.onGorund()) {
      this.game.player.vy -= this.game.player.maxVy;
    }
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 6;
    this.game.player.frameY = 1;
  }

  handleInput(input) {
    if (this.game.player.vy > this.game.player.gravity) {
      this.game.player.setState(States.FALLING, 1);
    } else if (input.includes("Enter")) {
      this.game.player.setState(States.ROLLING, 2);
    } else if (input.includes("ArrowDown")) {
      this.game.player.setState(States.DIVING, 0);
    }
  }
}

export class FallingState extends State {
  constructor(game) {
    super("JUMPING", game);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 8;
    this.game.player.frameY = 3;
  }

  handleInput(input) {
    if (this.game.player.onGorund()) {
      this.game.player.setState(States.RUNNING, 1);
    } else if (input.includes("ArrowDown")) {
      this.game.player.setState(States.DIVING, 0);
    }
  }
}

export class RollingState extends State {
  constructor(game) {
    super("ROLLING", game);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 6;
    this.game.player.frameY = 6;
  }

  handleInput(input) {
    this.game.particles.unshift(
      new FireParticle(
        this.game,
        this.game.player.x + this.game.player.width * 0.5,
        this.game.player.y + this.game.player.height * 0.5
      )
    );

    if (!input.includes("Enter") && this.game.player.onGorund()) {
      this.game.player.setState(States.RUNNING, 1);
    } else if (!input.includes("Enter") && !this.game.player.onGorund()) {
      this.game.player.setState(States.FALLING, 1);
    } else if (
      input.includes("Enter") &&
      input.includes("ArrowUp") &&
      this.game.player.onGorund()
    ) {
      this.game.player.vy -= 27;
    } else if (input.includes("ArrowDown") && !this.game.player.onGorund()) {
      this.game.player.setState(States.DIVING, 0);
    }
  }
}

export class DivingState extends State {
  constructor(game) {
    super("DIVING", game);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 6;
    this.game.player.frameY = 6;
    this.game.player.vy = 15;
  }

  handleInput(input) {
    this.game.particles.unshift(
      new FireParticle(
        this.game,
        this.game.player.x + this.game.player.width * 0.5,
        this.game.player.y + this.game.player.height * 0.5
      )
    );

    if (this.game.player.onGorund()) {
      this.game.player.setState(States.RUNNING, 1);

      for (let index = 0; index < 20; index++) {
        this.game.particles.unshift(
          new SplashParticle(
            this.game,
            this.game.player.x + this.game.player.width * 0.5,
            this.game.player.y + this.game.player.height
          )
        );
      }
    } else if (input.includes("Enter") && this.game.player.onGorund()) {
      this.game.player.setState(States.ROLLING, 2);
    }
  }
}

export class HitState extends State {
  constructor(game) {
    super("HIT", game);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 10;
    this.game.player.frameY = 4;
  }

  handleInput(input) {
    if (this.game.player.frameX >= 10 && this.game.player.onGorund()) {
      this.game.player.setState(States.RUNNING, 1);
    } else if (this.game.player.frameX >= 10 && !this.game.player.onGorund()) {
      this.game.player.setState(States.FALLING, 1);
    }
  }
}
