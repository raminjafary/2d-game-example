import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Background } from "./background.js";
import { ClimbingEnemy, FlyingEnemy, GroundEnemy } from "./enemy.js";
import { UI } from "./ui.js";

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = (canvas.width = 900);
const CANVAS_HEIGHT = (canvas.height = 500);

class Game {
  constructor(ctx, width, height) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.groundMargin = 80;
    this.speed = 0;
    this.maxSpeed = 3;
    this.background = new Background(this);
    this.player = new Player(this);
    this.input = new InputHandler(this);
    this.ui = new UI(this);
    this.particles = [];
    this.enemies = [];
    this.enemyTimer = 0;
    this.enemyInterval = 1000;
    this.debug = false;
    this.score = 0;
    this.player.currentState = this.player.states[0];
    this.player.currentState.enter();
    this.maxParticle = 100;
    this.collissions = [];
    this.gameOver = false;
    this.time = 0;
    this.timer = 90000;
  }

  update(deltatime) {
    this.time += deltatime;

    if (this.time > this.timer) {
      this.gameOver = true;
    }
    this.background.update();
    this.player.update(this.input.keys, deltatime);
    if (this.enemyTimer > this.enemyInterval) {
      this.addEnemy();
      this.enemyTimer = 0;
    } else {
      this.enemyTimer += deltatime;
    }
    this.enemies.forEach((e, i) => {
      e.update(deltatime);
      if (e.markedForDeletion) {
        this.enemies.splice(i, 1);
      }
    });

    this.particles.forEach((p, i) => {
      p.update(deltatime);
      if (p.markedForDeletion) {
        this.particles.splice(i, 1);
      }
    });

    this.collissions.forEach((c, i) => {
      c.update(deltatime);
      if (c.markedForDeletion) {
        this.collissions.splice(i, 1);
      }
    });

    if (this.particles.length > this.maxParticle) {
      this.particles.length = this.maxParticle;
    }
  }

  draw() {
    this.background.draw(this.ctx);
    this.player.draw(this.ctx);
    this.enemies.forEach((e) => e.draw(this.ctx));
    this.particles.forEach((p) => p.draw(this.ctx));
    this.collissions.forEach((c) => c.draw(this.ctx));
    this.ui.draw(ctx);
  }

  addEnemy() {
    if (this.speed > 0 && Math.random() < 0.5)
      this.enemies.push(new GroundEnemy(this));
    else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
    this.enemies.push(new FlyingEnemy(this));
  }
}

const game = new Game(ctx, CANVAS_WIDTH, CANVAS_HEIGHT);
let lastTime = 0;

function animate(timestamp = 0) {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  const deltatime = timestamp - lastTime;
  lastTime = timestamp;
  game.update(deltatime);
  game.draw();
  if (!game.gameOver) requestAnimationFrame(animate);
}

animate();
