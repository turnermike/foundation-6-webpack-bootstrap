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
            {
              loader: 'css-loader',
              // options: {
              //   modules: true,                                      // enable css modules
              //   minimize: false,                                    // minimize css
              //   sourceMap: false,                                   // had to set this to false for sourcemaps to work
              //   // sourceMapContents: true,                            // doesn't seem to do anything
              //   importLoaders: 2                
              // }
            },
            // 'postcss-loader',
            {
              loader: 'postcss-loader',
              // options: {
              //   sourceMap: true,
              //   sourceMapContents: true,
              // }
            },
            // 'sass-loader'
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
    
    new ExtractTextPlugin({                                         // save sass to css file
      filename: 'app.css',                                          // file name
      allChunks: true,                                              // generate a single css file for whole bundle
    }),

    new webpack.LoaderOptionsPlugin({                               // set loader options
      test: /\.scss$/,
      options: {
        cssLoader: {
          modules: true,                                            // enable css modules
          minimize: false,                                          // minimize css
          sourceMap: false,                                         // had to set this to false for sourcemaps to work
          sourceMapContents: true,                                  // doesn't seem to do anything
          importLoaders: 2           
        },
        postCssLoader: {
          sourceMap: true,
          sourceMapContents: true,
          plugins: () => [autoprefixer]
        },
        sassLoader: {
          includePaths: [path.resolve(__dirname, './scss')],        // files to include
          outFile: 'app.css',                                       // output css file name
          sourceMap: true,                                          // source map for browser dev tools
          sourceMapContents: true                                   // i don't think this works
        },
        context: '/'
      }
    })

  ])

};
