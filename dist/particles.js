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
const Particle = function (options) {
  var _ = this,
    random = Math.random,
    speed = options.speed,
    color =
      options.color instanceof Array
        ? options.color[Math.floor(Math.random() * options.color.length)]
        : options.color;

  _.rgb = hex2rgb(color);

  var canvas = document.querySelector(options.selector);
  _.x = canvas.offsetParent
    ? random() * canvas.offsetParent.clientWidth
    : random() * canvas.clientWidth;

  if (canvas.offsetParent && canvas.offsetParent.nodeName === "BODY") {
    _.y = random() * window.innerHeight;
  } else {
    _.y = canvas.offsetParent
      ? random() * canvas.offsetParent.clientHeight
      : random() * canvas.clientHeight;
  }

  _.vx = random() * speed * 2 - speed;
  _.vy = random() * speed * 2 - speed;
  _.radius = random() * random() * options.sizeVariations;
  _.color = color;
};

Particle.prototype._draw = function (context) {
  var _ = this;

  context.save();
  context.translate(_.x, _.y);
  context.moveTo(0, 0);
  context.beginPath();
  context.arc(0, 0, _.radius, 0, Math.PI * 2, false);
  context.fillStyle = _.color;
  context.fill();
  context.restore();
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

/***/ "./src/ParticleList.js":
/*!*****************************!*\
  !*** ./src/ParticleList.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ParticleList; });
class ParticleList {
  constructor() {
    this.x = [];
    this.y = [];
    this.vx = [];
    this.vy = [];
    this.radius = [];
  }

  createParticle(options) {
    const speed = options.speed;
    const color =
      options.color instanceof Array
        ? options.color[Math.floor(Math.random() * options.color.length)]
        : options.color;

    const canvas = document.querySelector(options.selector);
    const x = canvas.offsetParent
      ? Math.random() * canvas.offsetParent.clientWidth
      : Math.random() * canvas.clientWidth;
    this.x.push(x);

    if (canvas.offsetParent && canvas.offsetParent.nodeName === "BODY") {
      const y = Math.random() * window.innerHeight;
      this.y.push(y);
    } else {
      const y = canvas.offsetParent
        ? Math.random() * canvas.offsetParent.clientHeight
        : Math.random() * canvas.clientHeight;
      this.y.push(y);
    }

    const vx = Math.random() * speed * 2 - speed;
    this.vx.push(vx);
    const vy = Math.random() * speed * 2 - speed;
    this.vy.push(vx);
    const radius = Math.random() * Math.random() * options.sizeVariations;
    this.radius.push(vx);
  }
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

/* harmony import */ var _ParticleList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ParticleList */ "./src/ParticleList.js");



const Particles = (function (window, document) {
  "use strict";

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

  /**
   * Represents the plugin.
   *
   * @constructor
   */
  const Plugin = (function () {
    function Plugin() {
      var _ = this;

      _.defaults = {
        responsive: null,
        selector: null,
        maxParticles: 100,
        sizeVariations: 3,
        showParticles: true,
        speed: 0.5,
        color: "#000000",
        minDistance: 120,
        connectParticles: false,
      };

      _.element = null;
      _.context = null;
      _.ratio = null;
      _.breakpoints = [];
      _.activeBreakpoint = null;
      _.breakpointSettings = [];
      _.originalSettings = null;
      _.storage = [];
      _.usingPolyfill = false;
    }

    return Plugin;
  })();

  /**
   * Public mehtod to initialize the plugin with user settings.
   *
   * @public
   * @param {object} settings
   */
  Plugin.prototype.init = function (settings) {
    var _ = this;

    _.options = _._extend(_.defaults, settings);
    _.originalSettings = JSON.parse(JSON.stringify(_.options));

    _._animate = _._animate.bind(_);

    _._initializeCanvas();
    _._initializeEvents();
    _._registerBreakpoints();
    _._checkResponsive();
    _._initializeStorage();

    return _;
  };

  Plugin.prototype.start = function () {
    this._animate();
  };

  /**
   * Public method to destroy the plugin.
   *
   * @public
   */
  Plugin.prototype.destroy = function () {
    var _ = this;

    _.storage = [];
    //_.element.remove();

    window.removeEventListener("resize", _.listener, false);
    window.clearTimeout(_._animation);
    cancelAnimationFrame(_._animation);
  };

  /**
   * Setup the canvas element.
   *
   * @private
   */
  Plugin.prototype._initializeCanvas = function () {
    var _ = this,
      devicePixelRatio,
      backingStoreRatio;

    if (!_.options.selector) {
      console.warn(
        "particles.js: No selector specified! Check https://github.com/marcbruederlin/particles.js#options"
      );
      return false;
    }

    _.element = document.querySelector(_.options.selector);
    _.context = _.element.getContext("2d");

    devicePixelRatio = window.devicePixelRatio || 1;
    backingStoreRatio =
      _.context.webkitBackingStorePixelRatio ||
      _.context.mozBackingStorePixelRatio ||
      _.context.msBackingStorePixelRatio ||
      _.context.oBackingStorePixelRatio ||
      _.context.backingStorePixelRatio ||
      1;

    _.ratio = devicePixelRatio / backingStoreRatio;
    _.element.width = _.element.offsetParent
      ? _.element.offsetParent.clientWidth * _.ratio
      : _.element.clientWidth * _.ratio;

    if (_.element.offsetParent && _.element.offsetParent.nodeName === "BODY") {
      _.element.height = window.innerHeight * _.ratio;
    } else {
      _.element.height = _.element.offsetParent
        ? _.element.offsetParent.clientHeight * _.ratio
        : _.element.clientHeight * _.ratio;
    }
    _.element.style.width = "100%";
    _.element.style.height = "100%";

    _.context.scale(_.ratio, _.ratio);
  };

  /**
   * Register event listeners.
   *
   * @private
   */
  Plugin.prototype._initializeEvents = function () {
    var _ = this;

    _.listener = function () {
      _._resize();
    }.bind(this);
    window.addEventListener("resize", _.listener, false);
  };

  /**
   * Initialize the particle storage.
   *
   * @private
   */
  Plugin.prototype._initializeStorage = function () {
    var _ = this;
    _.storage = [];

    for (var i = _.options.maxParticles; i--; ) {
      _.storage.push(new _Particle__WEBPACK_IMPORTED_MODULE_0__["default"](_.options));
    }
  };

  /**
   * Register responsive breakpoints if the user declared some.
   *
   * @private
   */
  Plugin.prototype._registerBreakpoints = function () {
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
  };

  /**
   * Check if a breakpoint is active and load the breakpoints options.
   *
   * @private
   */
  Plugin.prototype._checkResponsive = function () {
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
        _.options = _._extend(
          _.options,
          _.breakpointSettings[targetBreakpoint]
        );
      } else {
        if (_.activeBreakpoint !== null) {
          _.activeBreakpoint = null;
          targetBreakpoint = null;

          _.options = _._extend(_.options, _.originalSettings);
        }
      }
    }
  };

  /**
   * Rebuild the storage and update the canvas.
   *
   * @private
   */
  Plugin.prototype._refresh = function () {
    var _ = this;

    _._initializeStorage();
    _._draw();
  };

  /**
   * Kick off various things on window resize.
   *
   * @private
   */
  Plugin.prototype._resize = function () {
    var _ = this;

    _.element.width = _.element.offsetParent
      ? _.element.offsetParent.clientWidth * _.ratio
      : _.element.clientWidth * _.ratio;

    if (_.element.offsetParent && _.element.offsetParent.nodeName === "BODY") {
      _.element.height = window.innerHeight * _.ratio;
    } else {
      _.element.height = _.element.offsetParent
        ? _.element.offsetParent.clientHeight * _.ratio
        : _.element.clientHeight * _.ratio;
    }

    _.context.scale(_.ratio, _.ratio);

    clearTimeout(_.windowDelay);

    _.windowDelay = window.setTimeout(function () {
      _._checkResponsive();
      _._refresh();
    }, 50);
  };

  /**
   * Animates the plugin particles by calling the draw method.
   *
   * @private
   */
  Plugin.prototype._animate = function () {
    var _ = this;

    _.step();
    _._animation = window.requestAnimFrame(_._animate);
  };

  Plugin.prototype.step = function () {
    this._draw();
  };

  /**
   * Restarts the particles animation by calling _animate.
   *
   * @public
   */
  Plugin.prototype.resumeAnimation = function () {
    var _ = this;

    if (!_._animation) {
      _._animate();
    }
  };

  /**
   * Pauses/stops the particle animation.
   *
   * @public
   */
  Plugin.prototype.pauseAnimation = function () {
    var _ = this;

    if (!_._animation) {
      return;
    }

    if (_.usingPolyfill) {
      window.clearTimeout(_._animation);
    } else {
      var cancelAnimationFrame =
        window.cancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        window.mozCancelAnimationFrame;
      cancelAnimationFrame(_._animation);
    }

    _._animation = null;
  };

  /**
   * Draws the plugin particles.
   *
   * @private
   */
  Plugin.prototype._draw = function () {
    var _ = this,
      element = _.element,
      parentWidth = element.offsetParent
        ? element.offsetParent.clientWidth
        : element.clientWidth,
      parentHeight = element.offsetParent
        ? element.offsetParent.clientHeight
        : element.clientHeight,
      showParticles = _.options.showParticles,
      storage = _.storage;

    if (element.offsetParent && element.offsetParent.nodeName === "BODY") {
      parentHeight = window.innerHeight;
    }

    _.context.clearRect(0, 0, element.width, element.height);
    _.context.beginPath();

    for (var i = storage.length; i--; ) {
      var particle = storage[i];

      if (showParticles) {
        particle._draw(_.context);
      }

      particle._updateCoordinates(parentWidth, parentHeight);
    }

    if (_.options.connectParticles) {
      _.connect();
    }
  };

  Plugin.prototype.connect = function () {
    this.storage.sort(particleCompareFunc);
    this._updateEdges();
  };

  /**
   * Updates the edges.
   *
   * @private
   */
  Plugin.prototype._updateEdges = function () {
    var _ = this,
      minDistance = _.options.minDistance,
      sqrt = Math.sqrt,
      abs = Math.abs,
      storage = _.storage,
      storageLength = storage.length;

    for (let i = 0; i < storageLength; i++) {
      const p1 = storage[i];

      for (let j = i + 1; j < storageLength; j++) {
        const p2 = storage[j];

        const r = p1.x - p2.x;
        if (abs(r) > minDistance) {
          break;
        }

        const dy = p1.y - p2.y;
        const distance = sqrt(r * r + dy * dy);
        if (distance <= minDistance) {
          _._drawEdge(p1, p2, 1.2 - distance / minDistance);
        }
      }
    }
  };

  /**
   * Draws an edge between two points.
   *
   * @private
   * @param {Particle} p1
   * @param {Particle} p2
   * @param {number} opacity
   */
  Plugin.prototype._drawEdge = function (p1, p2, opacity) {
    var _ = this,
      gradient = _.context.createLinearGradient(p1.x, p1.y, p2.x, p2.y);

    gradient.addColorStop(
      0,
      `rgba(${p1.rgb.r},${p1.rgb.g},${p1.rgb.b},${opacity})`
    );
    gradient.addColorStop(
      1,
      `rgba(${p2.rgb.r},${p2.rgb.g},${p2.rgb.b},${opacity})`
    );

    _.context.beginPath();
    _.context.moveTo(p1.x, p1.y);
    _.context.lineTo(p2.x, p2.y);
    _.context.strokeStyle = gradient;
    _.context.stroke();
    _.context.closePath();
  };

  /**
   * Merges the keys of two objects.
   *
   * @private
   * @param {object} source
   * @param {object} obj
   */
  Plugin.prototype._extend = function (source, obj) {
    Object.keys(obj).forEach(function (key) {
      source[key] = obj[key];
    });

    return source;
  };

  /**
   * A polyfill for requestAnimFrame.
   *
   * @return {function}
   */
  window.requestAnimFrame = (function () {
    var _ = this,
      requestAnimationFrame =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame;

    if (requestAnimationFrame) {
      return requestAnimationFrame;
    }

    _._usingPolyfill = true;

    return function (callback) {
      return window.setTimeout(callback, 1000 / 60);
    };
  })();

  return Plugin;
})(window, document);




/***/ })

/******/ });
//# sourceMappingURL=particles.js.map