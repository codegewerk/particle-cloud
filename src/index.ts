import BreakpointSettings, {
  ResponsiveOptionEntry,
} from "./BreakpointSettings";
import ParticleField from "./ParticleField";

import { ParticleSettings } from "./Settings";

interface Options extends ParticleSettings {
  selector: string;
  responsive: Array<ResponsiveOptionEntry>;
}

function parseOptions(options: unknown): Options {
  options = Object.assign(
    {
      responsive: [],
      maxParticles: 100,
      sizeVariations: 3,
      showParticles: true,
      speed: 0.5,
      color: "#000000",
      minDistance: 120,
      connectParticles: false,
    },
    options
  );

  return options as Options;
}

function getElement(selector: string): HTMLCanvasElement {
  const element = document.querySelector<HTMLCanvasElement>(selector);

  if (element === null)
    throw new Error(
      `particle-cloud: can not find canvas element with given selector: ${selector}`
    );
  else return element;
}

class ParticleCloud {
  private scheduler: AnimationScheduler;
  private breakpointOptions: BreakpointSettings;

  private element: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private ratio: number;

  private particleField: ParticleField;

  private _animation: number | undefined;
  private _windowDelay: number | undefined;

  private onResize: () => void;

  constructor(options: unknown) {
    const parsedOptions = parseOptions(options);

    const { selector, responsive, ...settings } = parsedOptions;

    if (!selector) {
      throw new Error(
        "particle-cloud: No selector specified! Check https://github.com/codegewerk/particle-cloud#options"
      );
    }

    this.scheduler = getAnimationScheduler();
    this.breakpointOptions = new BreakpointSettings(settings, responsive);
    this.onResize = () => this.resize();

    this.element = getElement(selector);
    this.element.style.width = "100%";
    this.element.style.height = "100%";

    this.context = this.element.getContext("2d") as CanvasRenderingContext2D;

    this.ratio = getPixelRatio(this.context);

    this.scaleContext();
    this.particleField = this.createParticleField();

    this.subscribeToEvents();
  }

  createParticleField() {
    const [clientWidth, clientHeight] = this.getDimensions();
    const settings = this.getResponsiveSettings();

    return new ParticleField(settings, this.context, clientWidth, clientHeight);
  }

  start() {
    if (!this._animation) this.animate();
  }

  stop() {
    if (!this._animation) {
      return;
    }

    this.scheduler.cancelFrame(this._animation);
    this._animation = undefined;
  }

  animate() {
    this.step();
    this._animation = this.scheduler.requestFrame(() => this.animate());
  }

  step() {
    this.move();
    this.draw();
  }

  move() {
    this.particleField.move();
  }

  draw() {
    this.context.clearRect(0, 0, this.element.width, this.element.height);
    this.particleField.draw();
  }

  destroy() {
    this.unsubscribeFromEvents();
    this.stop();
  }

  subscribeToEvents() {
    window.addEventListener("resize", this.onResize, false);
  }

  unsubscribeFromEvents() {
    window.removeEventListener("resize", this.onResize, false);
  }

  resize() {
    this.scaleContext();

    clearTimeout(this._windowDelay);
    this._windowDelay = window.setTimeout(() => {
      this.particleField = this.createParticleField();
    }, 50);
  }

  scaleContext() {
    const [clientWidth, clientHeight] = this.getDimensions();
    this.element.width = clientWidth * this.ratio;
    this.element.height = clientHeight * this.ratio;

    this.context.scale(this.ratio, this.ratio);
  }

  getDimensions() {
    const canvas = this.element;

    let clientHeight;
    if (canvas.offsetParent && canvas.offsetParent.nodeName === "BODY") {
      clientHeight = window.innerHeight;
    } else {
      clientHeight = canvas.offsetParent
        ? canvas.offsetParent.clientHeight
        : canvas.clientHeight;
    }

    const clientWidth = canvas.offsetParent
      ? canvas.offsetParent.clientWidth
      : canvas.clientWidth;

    return [clientWidth, clientHeight];
  }

  getResponsiveSettings() {
    const windowWidth = window.innerWidth;
    return this.breakpointOptions.getOptionsForWidth(windowWidth);
  }
}

interface AnimationScheduler {
  requestFrame: typeof window.requestAnimationFrame;
  cancelFrame: typeof window.cancelAnimationFrame;
}

function getAnimationScheduler(): AnimationScheduler {
  let requestFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    // @ts-ignore: 2339
    window.mozRequestAnimationFrame;

  let cancelFrame;
  if (requestFrame) {
    requestFrame = requestFrame.bind(window);
    cancelFrame = cancelAnimationFrame.bind(window);
  } else {
    requestFrame = function (callback) {
      return window.setTimeout(callback, 1000 / 60);
    };
    cancelFrame = window.clearTimeout.bind(window);
  }

  return { requestFrame, cancelFrame };
}

function getPixelRatio(context: CanvasRenderingContext2D) {
  const devicePixelRatio = window.devicePixelRatio || 1;
  const backingStoreRatio =
    // @ts-ignore: 2339
    context.webkitBackingStorePixelRatio ||
    // @ts-ignore: 2339
    context.mozBackingStorePixelRatio ||
    // @ts-ignore: 2339
    context.msBackingStorePixelRatio ||
    // @ts-ignore: 2339
    context.oBackingStorePixelRatio ||
    // @ts-ignore: 2339
    context.backingStorePixelRatio ||
    1;

  return devicePixelRatio / backingStoreRatio;
}

export default ParticleCloud;
