# rollup-plugin-imba

Use the [Imba compiler](https://v2.imba.io/) (v2) to build `*.imba` files from source using [Rollup](https://rollupjs.org/).

## Install

```sh
# npm:
npm install --save-dev @eulores/rollup-plugin-imba
# yarn:
yarn --dev add @eulores/rollup-plugin-imba
```

## Quick start

### Create a sample directory and download the plugin

```sh
mkdir sample
cd sample
yarn init
yarn --dev add rollup
yarn --dev add @rollup/plugin-node-resolve
yarn --dev add @eulores/rollup-plugin-imba
```

#### rollup.config.js

Create or edit `rollup.config.js` to add the `rollup-plugin-imba` plugin

```js
import resolve from '@rollup/plugin-node-resolve';
import imbaPlugin from '@eulores/rollup-plugin-imba';

export default {
  input: 'src/sample.imba',
  plugins: [
    resolve({"extensions": ['.js', '.imba']}),
    imbaPlugin()
  ],
  output: {
    file: 'build/bundle.js',
    format: 'esm'
  }
};
```

#### package.json

Verify the required development dependencies in `package.json`

```js
{
  "devDependencies": {
    "@eulores/rollup-plugin-imba": "^0.0.4",
    "@rollup/plugin-node-resolve": "^9.0.0"
  }
}
```

### Create some source files

#### ./build/index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Imba project</title>
</head>
<body>
    <script src="/build/bundle.js"></script>
</body>
</html>
```

#### ./src/sample.imba

```html
// use TABS to indent the code. Check how you save the source in your editor!
tag app-root
    def render
        <self>
            <h1> "It works!"

imba.mount <app-root>
```

### Start developing your application.

`npx rollup -c`
