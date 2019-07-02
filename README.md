<p align="center">
  <a href="https://squarelink.com/" target="_blank">
    <img alt="Squarelink" src="https://squarelink.com/img/logo.png?v=2" width="450">
  </a>
</p>

# Squarelink Chrome Extension

> A Chrome Extension to replace MetaMask with Squarelink as the default Web3/ethereum provider and #killthefox

## Features

 - `window.ethereum` injected with Squarelink provider
- Network selector
 - Automatically interfaces with Squarelink

## Installation

```bash
# clone it
$ git clone https://github.com/Squarelink-Inc/Squarelink-Extension.git

# Install dependencies
$ npm install
```

## Development

### `npm run build`

Build the extension into `dist` folder for **production**.

### `npm run build:dev`

Build the extension into `dist` folder for **development**.

### `npm run watch`

Watch for modifications then run `npm run build`.

### `npm run watch:dev`

Watch for modifications then run `npm run build:dev`.

It also enable [Hot Module Reloading](https://webpack.js.org/concepts/hot-module-replacement), thanks to [webpack-chrome-extension-reloader](https://github.com/rubenspgcavalcante/webpack-chrome-extension-reloader) plugin.

:warning: Keep in mind that HMR only works for your **background** entry.

### `npm run build-zip`

Build a zip file for production. Zip file is located in `dist-zip` folder.

## Documentation

To get started developing with Squarelink, check out [our docs](https://docs.squarelink.com) and head to the [Squarelink Developer Console](https://dev.squarelink.com) to register your first DApp.

## LICENSE

[MIT](LICENSE)
