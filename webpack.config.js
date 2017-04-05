"use strict"

// var webpack = require('webpack'),
//     path = require('path'),
//     ExtractTextPlugin = require('extract-text-webpack-plugin'),
//     GetIfUtils = require('webpack-config-utils');

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { getIfUtils, removeEmpty } = require('webpack-config-utils');


var env = process.env.NODE_ENV;                                       // NODE_ENV variable set in package.json for each run ("scripts") command
const { ifProd, ifNotProd } = getIfUtils(env);
console.log('ifProd:', ifProd('true', 'false'));

// import webpack from 'webpack';
// import path from 'path';
// import ExtractTextPlugin from 'extract-text-webpack-plugin';

// check for environment variables

// const { ifProd, ifNotProd } = GetIfUtils(env);




// if(typeof env === 'undefined'){
//   console.log('=================\nNODE_ENV ENVIRONMENT VARIABLE NOT DEFINED\n=================');    
// }else{ 
//   console.log('=================\nCURRENT NODE_ENV: ', env, '\n=================\n');
// }



module.exports = {
  // debug: true,
  context: path.resolve(__dirname, '.'),
  devtool: ifProd('source-map', 'cheap-eval-source-map'),           // use full source map for prod, cheap and dirty for dev
  entry: {
    app: [ 
      './js/alert.js',
      './js/main.js',
      './scss/base.scss',
      './scss/header.scss'
    ]
  },
  output: {
    path: path.resolve(__dirname, './output'),
    filename: 'app.js'
  },
  module: {

    rules: [

      { // sass
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                minimize: false,
                sourceMap: false,                           // had to set this to false for sourcemaps to work
                debug: true,
                sourceMapContents: true,
                // importLoaders: 1                
              }
            },
            // 'postcss-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                sourceMapContents: true,
                debug: true
              }
            },
            // 'sass-loader'
            {
              loader: 'sass-loader',
              options: {
                outFile: 'app.css',                           // generated file name
                outputStyle: 'expanded',                      // code formating for css (compressed, expanded, nested, compact)
                sourceMap: true,                              // enable source map
                sourceMapContents: true,                   // doesn't seem to do anything
                debug: true
              }
            }
          ]
        })
      }
    ]  

  },

  plugins: [
    
    // save sass to single css file
    new ExtractTextPlugin({
      filename: 'app.css',
      allChunks: true,
    }),

    new webpack.LoaderOptionsPlugin({
      test: /\.scss$/,
      options: {
        postCssLoader: {
          sourceMap: true,
          plugins: () => [require('autoprefixer')]
        },
        sassLoader: {
          sourceMap: true,
          includePaths: [path.resolve(__dirname, './scss')]
        },
        context: '/'
      }
    })

  ]

};
