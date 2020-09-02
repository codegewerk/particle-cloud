import ParticleField from "./ParticleField";

class ParticleCloud {
  constructor(settings) {
    this.options = Object.assign(
      {
        responsive: null,
        selector: null,
        maxParticles: 100,
        sizeVariations: 3,
        showParticles: true,
        speed: 0.5,
        color: "#000000",
        minDistance: 120,
        connectParticles: false,
      },
      settings
    );
    this.originalSettings = JSON.parse(JSON.stringify(this.options));

    if (!this.options.selector) {
      throw new Error(
        "particles.js: No selector specified! Check https://github.com/marcbruederlin/particles.js#options"
      );
    }

    this.scheduler = getAnimationScheduler();

    this.breakpoints = [];
    this.breakpointSettings = [];

    this.onResize = () => this.resize();

    this.initializeCanvas();
    this.registerBreakpoints();

    this.scaleContext();
    this._checkResponsive();
    this.initializeParticleField();

    this.subscribeToEvents();
  }

  initializeCanvas() {
    this.element = document.querySelector(this.options.selector);
    this.element.style.width = "100%";
    this.element.style.height = "100%";

    this.context = this.element.getContext("2d");
    this.ratio = getPixelRatio(this.context);
  }

  registerBreakpoints() {
    var _ = this,
      breakpoint,
      currentBreakpoint,
      l,
      responsiveSettings = _.options.responsive || null;

    if (
      typeof responsiveSettings === "object" &&
      responsiveSettings !== null &&
      responsiveSettings.length
    ) {
      for (breakpoint in responsiveSettings) {
        l = _.breakpoints.length - 1;
        currentBreakpoint = responsiveSettings[breakpoint].breakpoint;

        if (responsiveSettings.hasOwnProperty(breakpoint)) {
          while (l >= 0) {
            if (_.breakpoints[l] && _.breakpoints[l] === currentBreakpoint) {
              _.breakpoints.splice(l, 1);
            }

            l--;
          }

          _.breakpoints.push(currentBreakpoint);
          _.breakpointSettings[currentBreakpoint] =
            responsiveSettings[breakpoint].options;
        }
      }

      _.breakpoints.sort(function (a, b) {
        return b - a;
      });
    }
  }

  initializeParticleField() {
    const [clientWidth, clientHeight] = this.getDimensions();
    this.particleField = new ParticleField(
      this.options,
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
    this.windowDelay = window.setTimeout(() => {
      this._checkResponsive();
      this.initializeParticleField();
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

  _checkResponsive() {
    var _ = this,
      breakpoint,
      targetBreakpoint = false,
      windowWidth = window.innerWidth;

    if (
      _.options.responsive &&
      _.options.responsive.length &&
      _.options.responsive !== null
    ) {
      targetBreakpoint = null;

      for (breakpoint in _.breakpoints) {
        if (_.breakpoints.hasOwnProperty(breakpoint)) {
          if (windowWidth <= _.breakpoints[breakpoint]) {
            targetBreakpoint = _.breakpoints[breakpoint];
          }
        }
      }

      if (targetBreakpoint !== null) {
        _.activeBreakpoint = targetBreakpoint;
        _.options = extend(_.options, _.breakpointSettings[targetBreakpoint]);
      } else {
        if (_.activeBreakpoint !== null) {
          _.activeBreakpoint = null;
          targetBreakpoint = null;

          _.options = extend(_.options, _.originalSettings);
        }
      }
    }
  }
}

function extend(source, obj) {
  Object.keys(obj).forEach(function (key) {
    source[key] = obj[key];
  });

  return source;
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
