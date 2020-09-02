# particle-cloud

This is a fork of [particles.js](https://github.com/marcbruederlin/particles.js).

![GitHub file size in bytes](https://img.shields.io/github/size/codegewerk/particle-cloud/dist/particles.min.js)
![GitHub license](https://img.shields.io/github/license/codegewerk/particle-cloud)

## Installation

There are several ways to install particles.js:

- [Download the latest version](https://github.com/marcbruederlin/particles.js/archive/master.zip)
- Install with npm: `npm install particlesjs --save`
- Use the CDN: `https://cdnjs.cloudflare.com/ajax/libs/particlesjs/2.2.3/particles.min.js`

## Usage

Include the minified JS in your HTML (right before the closing body tag).

```html
<body>
  …
  <script src="path/to/particles.min.js"></script>
</body>
```

Add a canvas element to your markup (it should be the last element)

```html
<body>
  …
  <canvas class="background"></canvas>
  <script src="path/to/particles.min.js"></script>
</body>
```

Add a few styles to your css.

```css
html,
body {
  margin: 0;
  padding: 0;
}

.background {
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  z-index: 0;
}
```

Initialize the plugin on the `window.onload` event.

```js
window.onload = function () {
  Particles.init({
    selector: ".background",
  });
};
```

## Options

| Option             | Type               | Default   | Description                                                           |
| ------------------ | ------------------ | --------- | --------------------------------------------------------------------- |
| `selector`         | string             | -         | _Required:_ The CSS selector of your canvas element                   |
| `maxParticles`     | integer            | `100`     | _Optional:_ Maximum amount of particles                               |
| `sizeVariations`   | integer            | `3`       | _Optional:_ Amount of size variations                                 |
| `speed`            | integer            | `0.5`     | _Optional:_ Movement speed of the particles                           |
| `color`            | string or string[] | `#000000` | _Optional:_ Color(s) of the particles and connecting lines            |
| `minDistance`      | integer            | `120`     | _Optional:_ Distance in `px` for connecting lines                     |
| `connectParticles` | boolean            | `false`   | _Optional:_ `true`/`false` if connecting lines should be drawn or not |
| `responsive`       | array              | `null`    | _Optional:_ Array of objects containing breakpoints and options       |

Example how to use the [responsive option](https://marcbruederlin.github.io/particles.js/#responsive-option).

## License

This is is released under the [MIT license](https://github.com/codegewerk/particle-cloud/blob/master/LICENSE).
