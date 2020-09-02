# particle-cloud

A lightweight, dependency-free and responsive javascript plugin for particle backgrounds.

This is a fork of [particles.js](https://github.com/marcbruederlin/particles.js).

![GitHub file size in bytes](https://img.shields.io/github/size/codegewerk/particle-cloud/dist/particles.min.js)
![GitHub license](https://img.shields.io/github/license/codegewerk/particle-cloud)

## Installation

```bash
npm install -save @codegewerk/particle-cloud
```

Alternatively, the minified package can be used directly via a CDN.

```html
<script src="https://unpkg.com/@codegewerk/particle-cloud@1.x/dist/particles.min.js"></script>
```

## Minimal Example

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      html,
      body {
        margin: 0;
        padding: 0;
        height: 100%;
      }

      .background {
        position: absolute;
        display: block;
        top: 0;
        left: 0;
        z-index: 0;
        height: 100%;
      }
    </style>
  </head>
  <body>
    <canvas class="background"></canvas>
    <script src="https://unpkg.com/@codegewerk/particle-cloud@1.x/dist/particles.min.js"></script>
    <script>
      const instance = new ParticleCloud({
        connectParticles: true,
        selector: ".background",
      });
      instance.start();
    </script>
  </body>
</html>
```

## Use as a `npm` module

You need to import the `ParticleCloud` class before using the library.

```js
import ParticleCloud from "particle-cloud";

const instance = new ParticleCloud({
  connectParticles: true,
  selector: ".background",
});
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

## License

This is is released under the [MIT license](https://github.com/codegewerk/particle-cloud/blob/master/LICENSE).
