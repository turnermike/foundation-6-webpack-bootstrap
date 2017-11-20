"use strict"

// load modules
const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const FixDefaultImportPlugin = require('webpack-fix-default-import-plugin');
const { getIfUtils, removeEmpty } = require('webpack-config-utils');
const pkg = require('./package.json');

// environment setup
var env = process.env.NODE_ENV;                                       // NODE_ENV variable set in package.json for each run ("scripts") command
const { ifProd, ifNotProd } = getIfUtils(env);                        // define ifProd and ifNotProd functions

// node modules to auto load, rather than use import/require in js files. called via webpack.ProvidePlugin
var jsModules = {
  $: 'jquery',
  jQuery: 'jquery',
  'window.jQuery': 'jquery',
  foundation: 'foundation-sites',
  truncatise: 'truncatise'
}

// set image/font paths for css
var imagePath = ifProd("'../images'", "'../images'");
var fontPath = ifProd("'../fonts'", "'../fonts'");

// debug logging
console.log('\n-------------------------- Start Debug Output --------------------------');
console.log('pkg.dependencies: ', pkg.dependencies);
console.log('ifProd: ', ifProd('true', 'false'));
console.log('imagePath: ', imagePath);
console.log('fontPath: ', fontPath);
console.log('jsModules', jsModules);
console.log('__dirname', __dirname);
console.log('test: ', path.resolve(__dirname, '../deploy/scss'));
console.log('--------------------------- End Debug Output ---------------------------\n');

module.exports = {

  context: path.resolve(__dirname, './'),                    // base dir

  devtool: ifProd('false', 'source-map'),                           // use full source map for prod, cheap and dirty for dev

  cache: false,

  entry: {                                                          // entry points
    app: [
      // './foundation-sites.config.js',                        // NODE_PATH is used in package.json to set the
      '../deploy/js/main.js',
      '../deploy/scss/app.scss'
    ],
    // vendor: ['jquery', 'sticky-js']
    vendor: Object.keys(pkg.dependencies)                           // load vendor scripts from package.json dependencies
  },

  output: {
    path: path.resolve(__dirname, '../deploy/output'),                      // js output dir
    filename: '[name].js',                                          // js bundled file name
    chunkFilename: '[name]-[chunkhash].js'
  },

  resolve: {
    modules: [
      // path.resolve(__dirname, './foundation-sites.config.js'),
      path.resolve(__dirname, 'node_modules'),                    // easily resolve node modules using import
    ]
  },

  // ------------------------------------
  // Module
  // ------------------------------------
  module: {

    rules: removeEmpty([                                            // removeEmpty() belongs to webpack-config-utils

      // SASS/CSS
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: ifProd(false, true),
                sourceComments: ifProd(false, true),
                plugins: (loader) => [
                  require('autoprefixer')(),
                ]
              }
            },
            {
              loader: 'sass-loader',
              options: {
                includePaths: [path.resolve(__dirname, '../deploy/scss')],
                sourceMap: ifProd(false, true),
                sourceComments: ifProd(false, true),
                outputStyle: ifProd('compact', 'expanded'),                             // code formating for css (compressed, expanded, nested, compact)
                data: "$image-path: " + imagePath + ";$font-path: " + fontPath + ";"      // pass variables to sass
              }
            }
          ]
        })
      },

      // FONTS
      {
        test: /\.(woff|woff2|ttf|eot|svg)$/,
        include: [path.resolve(__dirname, '../deploy/fonts')],
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]',
          // limit: 100000
        }
      },

      // IMAGES
      {
        test: /\.(png|svg|jpg|gif)$/,
        include: [path.resolve(__dirname, '../deploy/images')],
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]',
          // limit: 100000
        }
      },


      // // JS/ES6
      // {
      //   test: /\.(js(x?)|es6)$/,
      //   loader: 'babel-loader',
      //   // exclude: /node_modules/,
      //   query: {
      //     presets: ['es2015']
      //   }
      // }

    ])

  },

  // ------------------------------------
  // Plugins
  // ------------------------------------
  plugins: removeEmpty([                                            // removeEmpty() belongs to webpack-config-utils

    ifProd(new ProgressBarPlugin()),                                        // display a progress bar during build

    // https://webpack.js.org/plugins/loader-options-plugin/
    ifProd(new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: true
    })),

    // automatically load vendor modules, rather than use require in files
    // jsModules object populated at top of file
    new webpack.ProvidePlugin(jsModules),

    // save sass to external css file, rather than embedding in <style> tag
    new ExtractTextPlugin({
      filename: 'app.css',
      allChunks: true,                                              // generate a single css file for whole bundle
    }),

    // Source Maps
    ifProd(new webpack.SourceMapDevToolPlugin({
      filename: '[name].js.map',
      exclude: ['vendor.js']
    })),

    // js
    ifProd(new webpack.optimize.UglifyJsPlugin({
      exclude: /node_modules/,
      uglifyOptions: {
        warnings: true
      }
    }))

  ])

};