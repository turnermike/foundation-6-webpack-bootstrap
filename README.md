# Foundation 6 Webpack Boilerplate
A starter/bootstrap project for static websites using Webpack and Foundation.

Using:

- Webpack 2

- Foundation 6

- Docker


## Setup Project
These are one time run commands. Only needed after cloning a repo or starting from scratch.
The installation will need to be run from the ```deploy``` directory.
```
cd deploy
npm install                      // install dependencies
```

## Docker
Run docker commands from project root directory. Same location as the `docker-compose.yml`.

### Start Docker (In detached mode)
```
docker-compose up -d
```

### Rebuild a running container.
If edits are made to Docker configs, a rebuild would be required.
```
docker-compose up --build -d
```


## Webpack
Webpack is used as the task runner for SASS compilation including autoprefixing,
CSS/JS minificattion and source maps. Generated files are saved to the 'deploy/output' directory.
Run these commands from the deploy directory, same location as `webpack.config.js`.

### Available Commands

#### Remove/Tidy
Removes the ```output``` directory for housekeeping.
```npm run tidy```

#### Watch
Used durring development to automatically detect changes and build.
```npm run start```

#### Build for Development
Keeps code expanded and adds source maps.
```npm run build:dev```

#### Build for Production
Minifies code and does not include source maps.
```npm run build:prod```


## Node Modules

To add a new Javascript library/node module, add it to package.json under 'dependencies'. Webpack will automatically
load node modules to the vendor.js file once added to package.json. No update need to webpack.config.js.
```
npm install --save <package_name>
```


## Foundation Scripts/Styles
Foundation provides the ability to enable all functionality, or the bits and peices that you would like to enable.

To enable a Javascript file, please remove the comment from the file in question within:
```js/foundation-config.js```

To enable a SASS stylesheet, please remove the comment from the file in question within:
```scss/lib/_foundation-config.scss```


-----------------------------


## Extras

### Webpack Debugging
Debug Webpack with Chrome Dev Tools and node-nightly

A helpful chrome dev tools inspector for node.
[Source:](https://medium.com/webpack/webpack-bits-learn-and-debug-webpack-with-chrome-dev-tools-da1c5b19554)

#### Setup

1. Install node-nightly

```npm install -g node-nightly```

2. Add command to CLI

```node-nightly```

#### How to Use It

1. Retreive the chrome dev tools url.

```sudo node-nightly --inspect --debug-brk ./webpack.config.js```

2. CLI will return some results. Copy and paste the URL provide into Chrome.

3. Debug

