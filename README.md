
# Foundation 6 Webpack Boilerplate
A starter/bootstrap project using Webpack and Foundation.

Using:
- Webpack 2
- Bootstrap 3


## Create Project
These are one time run commands. Only needed after cloning a repo or starting from scratch.
```
npm init                         // if package.json does not already exist
npm install                      // install dependencies
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


## SASS

Bootstrap SASS variables can be overridden using ```scss/_bootstrap_sass_vars.scss```. Simply copy the variable declaration from
```node_modules/bootstrap-sass/assets/stylesheets/bootstrap/_variables.scss``` and remove the "!default" flag.


## Javascript

To add a new Javascript library/node module. 

1. Use the following command to add it to package.json as a dependency.
```
npm install --save <package_name>
```

2. Add the module alias to webpack.config.js. The alias is the package name as it appears in package.json.





## Debugging

### Debug Webpack with Chrome Dev Tools and node-nightly

A helpful chrome dev tools inspector for node. 
[Source:](https://medium.com/webpack/webpack-bits-learn-and-debug-webpack-with-chrome-dev-tools-da1c5b19554)

#### Setup

1. Install node-nightly

```npm install -g node-nightly```

2. Add command to CLI

``node-nightly```

#### How to Use It

1. Retreive the chrome dev tools url.

```sudo node-nightly --inspect --debug-brk ./webpack.config.js```

2. CLI will return some results. Copy and paste the URL provide into Chrome.

3. Debug

