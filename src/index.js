import BreakpointSettings from "./BreakpointSettings";
import ParticleField from "./ParticleField";

class ParticleCloud {
  constructor(options) {
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

    const { selector, responsive, ...settings } = options;

    if (!selector) {
      throw new Error(
        "particle-cloud: No selector specified! Check https://github.com/codegewerk/particle-cloud#options"
      );
    }

    this.scheduler = getAnimationScheduler();
    this.breakpointOptions = new BreakpointSettings(settings, responsive);
    this.onResize = () => this.resize();

    this.initializeCanvas(selector);

    this.scaleContext();
    this.initializeParticleField();

    this.subscribeToEvents();
  }

  initializeCanvas(selector) {
    this.element = document.querySelector(selector);
    this.element.style.width = "100%";
    this.element.style.height = "100%";

    this.context = this.element.getContext("2d");
    this.ratio = getPixelRatio(this.context);
  }

  initializeParticleField() {
    const [clientWidth, clientHeight] = this.getDimensions();
    const settings = this.getResponsiveSettings();

    this.particleField = new ParticleField(
      settings,
      this.context,
      clientWidth,
      clientHeight
    );
  }

  start() {
    if (!this._animation) this.animate();
  }

  stop() {
    if (!this._animation) {
      return;
    }

    this.scheduler.cancelFrame(this._animation);
    this._animation = null;
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

    clearTimeout(this.windowDelay);
    this.windowDelay = window.setTimeout(
      () => this.initializeParticleField(),
      50
    );
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

function getAnimationScheduler() {
  let requestFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
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

function getPixelRatio(context) {
  const devicePixelRatio = window.devicePixelRatio || 1;
  const backingStoreRatio =
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio ||
    1;

  return devicePixelRatio / backingStoreRatio;
}

export default ParticleCloud;
