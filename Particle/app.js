import { GlowParticle } from "./glowparticle.js";

const COLORS = [
  { r: 45, g: 74, b: 227 },
  { r: 250, g: 255, b: 89 },
  { r: 255, g: 104, b: 248 },
  { r: 44, g: 209, b: 252 },
  { r: 54, g: 233, b: 84 },
];

class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);

    this.ctx = this.canvas.getContext("2d");

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    this.totalParticles = 20;
    this.particles = [];

    this.maxRadius = 1100;
    this.minRadius = 600;

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    window.requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientWidth;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;

    this.ctx.scale(this.pixelRatio, this.pixelRatio);

    this.ctx.globalCompositeOperation = "saturation";

    this.createParticles();
  }

  createParticles() {
    let currentColor = 0;
    this.particles = [];

    for (let i = 0; i < this.totalParticles; i++) {
      const item = new GlowParticle(
        Math.random() * this.stageWidth,
        Math.random() * this.stageHeight,
        Math.random() * (this.maxRadius - this.minRadius) + this.minRadius,
        COLORS[currentColor]
      );

      if (++currentColor >= COLORS.length) {
        currentColor = 0;
      }

      this.particles[i] = item;
    }
  }
  animate() {
    window.requestAnimationFrame(this.animate.bind(this));

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    for (let i = 0; i < this.totalParticles; i++) {
      const item = this.particles[i];
      item.animate(this.ctx, this.stageWidth, this.stageHeight);
    }
  }
}

window.onload = () => {
  new App();
};
