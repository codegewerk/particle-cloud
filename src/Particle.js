const Particle = function (options) {
  var _ = this,
    random = Math.random,
    speed = options.speed,
    color =
      options.color instanceof Array
        ? options.color[Math.floor(Math.random() * options.color.length)]
        : options.color;

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

export default Particle;
