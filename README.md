# Foundation 6 Webpack Boilerplate
A starter/bootstrap project using Webpack and Foundation.

Using:
- Webpack 2
- Foundation 6
- Docker


## Setup Project
These are one time run commands. Only needed after cloning a repo or starting from scratch.
```
npm install                      // install dependencies
```

## Docker

### Start Docker (In detached mode)
```
docker-compose up -d
```

### Rebuild a running container.
If edits are made to Docker configs, a rebuild would be required.
```
docker-compose up --build -d
```


## Run Babel (not required)
```
npm run babel
```

## Available Build Command

### Development
```
npm start                        // sets NODE_ENV=dev, runs webpack --watch
npm run build:dev                // sets NODE_ENV=dev, runs webpack (no watch)
```

### Production
```
npm build                        // sets NODE_ENV=prod, runs webpack -p
```


## Node Modules

To add a new Javascript library/node module, add it to package.json under 'dependencies'. Webpack will automatically
load node modules to the vendor.js file once added to package.json. No update need to webpack.config.js.
```
npm install --save <package_name>
```


## Debugging

### Debug Webpack with Chrome Dev Tools and node-nightly

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

