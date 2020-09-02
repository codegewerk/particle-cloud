import { ParticleSettings } from "./Settings";

export default class Particle {
  public rgb: RGBColor;
  private color: string;

  public x: number;
  public y: number;
  private vx: number;
  private vy: number;
  private radius: number;

  constructor(
    options: ParticleSettings,
    clientHeight: number,
    clientWidth: number
  ) {
    var _ = this,
      random = Math.random,
      speed = options.speed,
      color =
        options.color instanceof Array
          ? options.color[Math.floor(Math.random() * options.color.length)]
          : options.color;

    _.rgb = hex2rgb(color);

    _.x = random() * clientWidth;
    _.y = random() * clientHeight;

    _.vx = random() * speed * 2 - speed;
    _.vy = random() * speed * 2 - speed;
    _.radius = random() * random() * options.sizeVariations;
    _.color = color;
  }

  draw(context: CanvasRenderingContext2D) {
    var _ = this;

    context.beginPath();
    context.arc(this.x, this.y, _.radius, 0, Math.PI * 2);
    context.fillStyle = _.color;
    context.fill();
  }

  updateCoordinates(parentWidth: number, parentHeight: number) {
    var _ = this,
      x = _.x + this.vx,
      y = _.y + this.vy,
      radius = _.radius;

    if (x + radius > parentWidth) {
      x = radius;
    } else if (x - radius < 0) {
      x = parentWidth - radius;
    }

    if (y + radius > parentHeight) {
      y = radius;
    } else if (y - radius < 0) {
      y = parentHeight - radius;
    }

    _.x = x;
    _.y = y;
  }
}

interface RGBColor {
  r: number;
  g: number;
  b: number;
}

const pattern = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

function hex2rgb(hex: string): RGBColor {
  const result = pattern.exec(hex);

  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}
