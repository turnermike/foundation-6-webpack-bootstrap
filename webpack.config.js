"use strict"

var webpack = require('webpack'),
    path = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

var env = process.env.NODE_ENV;
console.log('ENVIRONMENT: ', env);




module.exports = {
  // debug: true,
  context: path.resolve(__dirname, './src'),
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
    loaders: [
      { // regular css files
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          use: 'css-loader?importLoaders=1',
        }),
      },
      { // sass / scss loader for webpack
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
      }
    ]    
    // loaders: [
    //   {
    //     test: /\.scss$/,
    //     loader: ExtractTextPlugin.extract({ 
    //       fallbackLoader: 'style-loader',
    //       loader: 'css-loader!sass-loader'
    //     })
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





// module.exports = {
//   // debug: true,
//   entry: './src/app.js',
//   output: {
//     path: path.resolve('./output'),
//     filename: 'app.js'
//   },
//   module: {
//     loaders: [
//       // { test: /\.css$/, loader: 'style-loader!css-loader!autoprefixer-loader' }
//       { test: /\.scss$/, loader: ExtractTextPlugin.extract('css!sass!scss') }
//     ]
//   },
//   plugins: [
//     new ExtractTextPlugin({ filename: 'output/app.css', disable: false, allChunks: true })
//   ]
// };