export default class ParticleList {
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
