# particle-cloud

A lightweight, dependency-free and responsive javascript plugin for particle backgrounds.

![GitHub license](https://img.shields.io/github/license/codegewerk/particle-cloud)

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

instance.start();
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

| Key                | Type               | Default   | Description                                                           |
| ------------------ | ------------------ | --------- | --------------------------------------------------------------------- |
| `selector`         | string             | -         | _Required:_ The CSS selector of your canvas element                   |
| `maxParticles`     | number             | `100`     | _Optional:_ Amount of particles                                       |
| `sizeVariations`   | number             | `3`       | _Optional:_ Maximum size of each particle                             |
| `speed`            | number             | `0.5`     | _Optional:_ Movement speed of each particle                           |
| `color`            | string or string[] | `#000000` | _Optional:_ Color(s) of the particles and connecting lines            |
| `minDistance`      | number             | `120`     | _Optional:_ Distance in `px` for connecting lines                     |
| `connectParticles` | boolean            | `false`   | _Optional:_ `true`/`false` if connecting lines should be drawn or not |
| `responsive`       | BreakpointEntry[]  | `[]`      | _Optional:_ Array of objects containing breakpoints and options       |

### BreakpointEntry

When any breakpoint options are specified, the library tries to find the smallest breakpoint with is still larger than the
current screen size.
If there is not such breakpoint, the library will fall back to the general settings.
If there is a suitable breakpoint, the relevant options from the general settings are overwritten with the breakpoint specific
options.

| Key          | Type              | Default | Description                        |
| ------------ | ----------------- | ------- | ---------------------------------- |
| `breakpoint` | number            | -       | _Required:_ The breakpoint value   |
| `options`    | BreakpointOptions | -       | _Required:_ The breakpoint options |

Each `BreakpointOptions` has the following fields:

| Key                | Type               | Default     | Description                                                           |
| ------------------ | ------------------ | ----------- | --------------------------------------------------------------------- |
| `maxParticles`     | number             | `undefined` | _Optional:_ Amount of particles                                       |
| `sizeVariations`   | number             | `undefined` | _Optional:_ Maximum size of each particle                             |
| `speed`            | number             | `undefined` | _Optional:_ Movement speed of each particle                           |
| `color`            | string or string[] | `undefined` | _Optional:_ Color(s) of the particles and connecting lines            |
| `minDistance`      | number             | `undefined` | _Optional:_ Distance in `px` for connecting lines                     |
| `connectParticles` | boolean            | `undefined` | _Optional:_ `true`/`false` if connecting lines should be drawn or not |

### Example Configuration

```js
import ParticleCloud from "@codegewerk/particle-cloud";

const instance = new ParticleCloud({
  selector: ".background",
  maxParticles: 1000,
  connectParticles: true,
  responsive: [
    {
      breakpoint: 300,
      options: {
        color: "#ff0000",
        maxParticles: 200,
      },
    },
    {
      breakpoint: 600,
      options: {
        color: "#00ff00",
        maxParticles: 600,
      },
    },
  ],
});
```

## License

This is is released under the [MIT license](https://github.com/codegewerk/particle-cloud/blob/master/LICENSE).
