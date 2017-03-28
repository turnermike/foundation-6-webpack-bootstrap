
# Foundation 6 Webpack Bootstrap
A starter/bootstrap project using Webpack and Foundation.

## Create Project
These are one time run commands. Only needed after cloning a repo or starting from scratch.
```
npm init                         // if package.json does not already exist
npm install                      // install dependencies
```

## Set Environment Variable (NODE_ENV)
Run one of these commands on the relative server. This variable is required by webpack.config.js.
```
export NODE_ENV=dev             // local/development
export NODE_ENV=staging         // staging
export NODE_ENV=production      // production
```

## Build Commands
These commands do most of the work. Use 'watch' for dev and 'build' for production deployments.
```
npm run watch                   // dev task runner
npm run build                   // build files, no watch
```

