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
  devtool: 'inline-source-map',
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
                sourceMap: false,
                debug: true
                // sourceMapContents: true,
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
                outFile: 'app.css',
                outputStyle: 'expanded',
                sourceMap: true,
                sourceMapContents: true,
                debug: true
                // sourceMap: true,
                // sourceMapContents: true
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
