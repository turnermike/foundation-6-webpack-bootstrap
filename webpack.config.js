"use strict"

var webpack = require('webpack'),
    path = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

// check for environment variables
var env = process.env.NODE_ENV;
if(typeof env === 'undefined'){
  console.log('=================\nNODE_ENV ENVIRONMENT VARIABLE NOT DEFINED\n=================');    
}else{ 
  console.log('=================\nCURRENT NODE_ENV: ', env, '\n=================\n');
}



module.exports = {
  // debug: true,
  context: path.resolve(__dirname, '.'),
  devtool: 'source-map',
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

      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                // localIdentName: '[name]__[local]___[hash:base64:5]',
                importLoaders: 1                
              }
            },
            'postcss-loader',
            'sass-loader'
          ]
        })
      }
    ]

    // loaders: [
    //   { // regular css files
    //     test: /\.css$/,
    //     loader: ExtractTextPlugin.extract({
    //       use: 'css-loader?importLoaders=1',
    //     }),
    //   },
    //   { // sass / scss loader for webpack
    //     test: /\.(sass|scss)$/,
    //     loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
    //   }
    // ]    

  },
  plugins: [
    new ExtractTextPlugin({ // define where to save the file
      filename: 'app.css',
      allChunks: true,
    }),
  ],
};
