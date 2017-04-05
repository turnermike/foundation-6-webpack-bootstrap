
# Foundation 6 Webpack Bootstrap
A starter/bootstrap project using Webpack and Foundation.

## Create Project
These are one time run commands. Only needed after cloning a repo or starting from scratch.
```
npm init                         // if package.json does not already exist
npm install                      // install dependencies
```

## Available Build Command

### Development
```
npm start                        // sets NODE_ENV='dev', runs webpack --watch
```

### Production
```
npm build                        // sets NODE_ENV='production', runs webpack -p
```


# Debugging

## Debug Webpack with Chrome Dev Tools and node-nightly

A helpful chrome dev tools inspector for node. 
[Source:](https://medium.com/webpack/webpack-bits-learn-and-debug-webpack-with-chrome-dev-tools-da1c5b19554)

### Setup

1. Install node-nightly

```npm install -g node-nightly```

2. Add command to CLI

``node-nightly```

### How to Use It

1. Retreive the chrome dev tools url.

```node-nightly --inspect --debug-brk ./webpack.config.js```

2. CLI will return some results. Copy and paste the URL provide into Chrome.

3. Debug

