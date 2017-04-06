"use strict"

// load modules
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const { getIfUtils, removeEmpty } = require('webpack-config-utils');
const autoprefixer = require('autoprefixer');

// environment setup
var env = process.env.NODE_ENV;                                       // NODE_ENV variable set in package.json for each run ("scripts") command
const { ifProd, ifNotProd } = getIfUtils(env);                        // define ifProd and ifNotProd functions
console.log('ifProd:', ifProd('true', 'false'));



module.exports = {

  context: path.resolve(__dirname, '.'),                            // base dir

  devtool: ifProd('source-map', 'cheap-eval-source-map'),           // use full source map for prod, cheap and dirty for dev

  entry: {                                                          // entry points
    app: [ 
      './js/alert.js',
      './js/main.js',
      './scss/base.scss',
      './scss/header.scss'
    ]
  },

  output: {
    path: path.resolve(__dirname, './output'),                      // js output dir
    filename: 'app.js'                                              // js bundled file name
  },

  // ------------------------------------
  // Module
  // ------------------------------------
  module: {

    rules: removeEmpty([                                            // removeEmpty() belongs to webpack-config-utils

      { 
        test: /\.scss$/,                                            // sass files
        exclude: /node_modules/,                                    // dirs to exclude
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',                                 // fallback loader
          use: [
            'css-loader',
            'postcss-loader',
            {
              loader: 'sass-loader',
              options: {
                outputStyle: 'expanded'                             // code formating for css (compressed, expanded, nested, compact)        
              }
            }
          ]
        })
      }
    ])  

  },

  // ------------------------------------
  // Plugins
  // ------------------------------------
  plugins: removeEmpty([                                            // removeEmpty() belongs to webpack-config-utils
    
    new ProgressBarPlugin(),                                        // display a progress bar during build

    new ExtractTextPlugin({                                         // save sass to css file
      filename: 'app.css',                                          // file name
      allChunks: true,                                              // generate a single css file for whole bundle
    }),

    new webpack.LoaderOptionsPlugin({                               // sass loader options
      test: /\.scss$/,                                              // applied to this file extension(s)
      debug: ifProd(false, true),                                   // debug setting
      options: {
        cssLoader: {
          modules: true,                                            // enable css modules
          minimize: ifProd(true, false),                            // minimize css
          sourceMap: ifProd(false, true),                           // had to set this to false for sourcemaps to work
          // sourceMapContents: true,                                  // doesn't seem to do anything
          importLoaders: 2           
        },
        postCssLoader: {
          sourceMap: ifProd(false, true),                            // source map
          // sourceMapContents: true,                                  // doesn't seem to do anything
          plugins: () => [autoprefixer]
        },
        sassLoader: {
          includePaths: [path.resolve(__dirname, './scss')],        // files to include
          outFile: 'app.css',                                       // output css file name
          sourceMap: ifProd(false, true),                           // source map for browser dev tools
          // sourceMapContents: true                                   // doesn't seem to do anything
        },
        context: '/'
      }
    }),

    ifProd(new webpack.optimize.UglifyJsPlugin({                    // js minification, applied to prod only
      compress: {
        screw_ie8: true,                                            // ignore ie8
        warnings: true                                              // show warnings
      },
      sourceMap: true                                               // source map
    }))

  ])

};
