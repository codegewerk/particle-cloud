import Particle from "./Particle";

export default class ParticleField {
  constructor(options, context, canvasWidth, canvasHeight) {
    console.assert(typeof canvasWidth === "number");
    console.assert(typeof canvasHeight === "number");
    console.assert(options.color);
    console.assert(options.speed);

    this.options = options;
    this.context = context;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.particles = [];
    for (let i = 0; i < options.maxParticles; i++) {
      this.particles.push(new Particle(options, canvasHeight, canvasWidth));
    }
  }

  move() {
    for (const particle of this.particles) {
      particle._updateCoordinates(this.canvasWidth, this.canvasHeight);
    }
  }

  draw() {
    if (this.options.showParticles) {
      for (const particle of this.particles) {
        particle._draw(this.context);
      }
    }

    if (this.options.connectParticles) {
      this.particles.sort(particleCompareFunc);
      this.updateEdges();
    }
  }

  updateEdges() {
    const minDistance = this.options.minDistance;
    const storageLength = this.particles.length;

    for (let i = 0; i < storageLength; i++) {
      const p1 = this.particles[i];

      for (let j = i + 1; j < storageLength; j++) {
        const p2 = this.particles[j];

        const r = p1.x - p2.x;
        if (Math.abs(r) > minDistance) {
          break;
        }

        const dy = p1.y - p2.y;
        const distance = Math.sqrt(r * r + dy * dy);
        if (distance <= minDistance) {
          this.drawEdge(p1, p2, 1.2 - distance / minDistance);
        }
      }
    }
  }

  drawEdge(p1, p2, opacity) {
    const gradient = this.context.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
    gradient.addColorStop(
      0,
      `rgba(${p1.rgb.r},${p1.rgb.g},${p1.rgb.b},${opacity})`
    );
    gradient.addColorStop(
      1,
      `rgba(${p2.rgb.r},${p2.rgb.g},${p2.rgb.b},${opacity})`
    );

    this.context.beginPath();
    this.context.moveTo(p1.x, p1.y);
    this.context.lineTo(p2.x, p2.y);
    this.context.strokeStyle = gradient;
    this.context.stroke();
  }
}

function particleCompareFunc(p1, p2) {
  if (p1.x < p2.x) {
    return -1;
  } else if (p1.x > p2.x) {
    return 1;
  } else if (p1.y < p2.y) {
    return -1;
  } else if (p1.y > p2.y) {
    return 1;
  }

  return 0;
}
