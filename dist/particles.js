var particles =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Particle.js":
/*!*************************!*\
  !*** ./src/Particle.js ***!
  \*************************/
/*! exports provided: default, hex2rgb */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hex2rgb", function() { return hex2rgb; });
const Particle = function (options, clientHeight, clientWidth) {
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
};

Particle.prototype._draw = function (context) {
  var _ = this;

  context.translate(_.x, _.y);
  context.moveTo(0, 0);
  context.beginPath();
  context.arc(0, 0, _.radius, 0, Math.PI * 2, false);
  context.fillStyle = _.color;
  context.fill();
};

Particle.prototype._updateCoordinates = function (parentWidth, parentHeight) {
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
};

/* harmony default export */ __webpack_exports__["default"] = (Particle);

const pattern = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
function hex2rgb(hex) {
  const result = pattern.exec(hex);

  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}


/***/ }),

/***/ "./src/ParticleField.js":
/*!******************************!*\
  !*** ./src/ParticleField.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ParticleField; });
/* harmony import */ var _Particle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Particle */ "./src/Particle.js");


class ParticleField {
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
    for (var i = options.maxParticles; i--; ) {
      this.particles.push(new _Particle__WEBPACK_IMPORTED_MODULE_0__["default"](options, canvasHeight, canvasWidth));
    }
  }

  move() {
    for (const particle of this.particles) {
      particle._updateCoordinates(this.canvasWidth, this.canvasHeight);
    }
  }

  draw() {
    if (this.options.showParticles) {
      this.context.save();
      for (const particle of this.particles) {
        particle._draw(this.context);
      }
      this.context.restore();
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


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: Particle, Particles, hex2rgb */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Particles", function() { return Particles; });
/* harmony import */ var _Particle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Particle */ "./src/Particle.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Particle", function() { return _Particle__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hex2rgb", function() { return _Particle__WEBPACK_IMPORTED_MODULE_0__["hex2rgb"]; });

/* harmony import */ var _ParticleField__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ParticleField */ "./src/ParticleField.js");



class Particles {
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
    this.particleField = new _ParticleField__WEBPACK_IMPORTED_MODULE_1__["default"](
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




/***/ })

/******/ });
//# sourceMappingURL=particles.js.map