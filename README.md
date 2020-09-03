# particle-cloud

![GitHub license](https://img.shields.io/github/license/codegewerk/particle-cloud)

A lightweight, dependency-free and responsive javascript plugin for particle backgrounds.

This is a fork of [particles.js](https://github.com/marcbruederlin/particles.js).
Compared to the archived original project, this library has several improvements:

- Bug fixes
- Performance improvements, i.e. for the drawing stage
- Complete port to [Typescript](https://www.typescriptlang.org/)
- Works with [React](https://reactjs.org/) server-side rendering, and therefore also [Gatsby](https://www.gatsbyjs.com/), out of the box

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

## Usage with `npm`

You need to import the `ParticleCloud` class before using the library.

```js
import ParticleCloud from "@codegewerk/particle-cloud";

const instance = new ParticleCloud({
  connectParticles: true,
  selector: ".background",
});
```

### Usage with React

```jsx
import React, { useEffect } from "react";
import ParticleCloud from "@codegewerk/particle-cloud";

export default function ParticleCloudCanvas() {
  useEffect(() => {
    const instance = new ParticleCloud({
      speed: 0.2,
      maxParticles: 100,
      selector: ".particles",
      color: ["#f58220", "#d28645", "#dddddd"],
      connectParticles: true,
    });

    instance.start();

    return () => instance.destroy();
  }, []);

  return <canvas className="particles"></canvas>;
}
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
