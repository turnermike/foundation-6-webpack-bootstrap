"use strict"

// load modules
const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const BellOnBundleErrorPlugin = require('bell-on-bundler-error-plugin');
const FixDefaultImportPlugin = require('webpack-fix-default-import-plugin');
const { getIfUtils, removeEmpty } = require('webpack-config-utils');


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
      './scss/app.scss'
      // './scss/base.scss',
      // './scss/header.scss'
    ]
  },

  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules')
    ]
  },

  output: {
    path: path.resolve(__dirname, './output'),                      // js output dir
    filename: '[name].js'                                           // js bundled file name
  },

  // ------------------------------------
  // Module
  // ------------------------------------
  module: {

    rules: removeEmpty([                                            // removeEmpty() belongs to webpack-config-utils

      { 
        test: /\.scss$/,                                            // sass files
        // exclude: /node_modules/,                                    // dirs to exclude
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
            },
            {
              loader: 'sass-resources-loader',
              options: {
                resources: [
                  path.resolve(__dirname, 'node_modules/bootstrap-sass/assets/stylesheets/bootstrap/variables'),
                  path.resolve(__dirname, 'node_modules/bootstrap-sass/assets/stylesheets/bootstrap/mixins/*.scss'),
                  path.resolve(__dirname, 'node_modules/bootstrap-sass/assets/stylesheets/bootstrap/normalize'),
                  path.resolve(__dirname, 'node_modules/bootstrap-sass/assets/stylesheets/bootstrap/print'),
                  path.resolve(__dirname, 'node_modules/bootstrap-sass/assets/stylesheets/bootstrap/glyphicons'),
                  path.resolve(__dirname, 'node_modules/bootstrap-sass/assets/stylesheets/bootstrap/scaffolding'),
                  path.resolve(__dirname, 'node_modules/bootstrap-sass/assets/stylesheets/bootstrap/type'),
                  path.resolve(__dirname, 'node_modules/bootstrap-sass/assets/stylesheets/bootstrap/code'),
                  path.resolve(__dirname, 'node_modules/bootstrap-sass/assets/stylesheets/bootstrap/grid'),
                  path.resolve(__dirname, 'node_modules/bootstrap-sass/assets/stylesheets/bootstrap/tables'),
                  path.resolve(__dirname, 'node_modules/bootstrap-sass/assets/stylesheets/bootstrap/buttons'),
                  
                ]
              }
            }
          ]
        })
      },

      {
        test: /\.(woff2?|ttf|eot|svg)$/,
        include: [path.resolve(__dirname, './fonts')],
        loader: 'url-loader',
        options: {
          name: './fonts/[name]-[hash].[ext]',
          limit: 100000
        }
      },

      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          name: './images/[name]-[hash].[ext]',
          limit: 100000
        }
      },

      {
        test: /bootstrap-sass\/assets\/javascripts\//,              // serve jQuery to bootstrap scripts
        loader: 'imports-loader',
        options: {
          jQuery: 'jquery'
        }
      }

    ])  

  },

  // ------------------------------------
  // Plugins
  // ------------------------------------
  plugins: removeEmpty([                                            // removeEmpty() belongs to webpack-config-utils
    
    new ProgressBarPlugin(),                                        // display a progress bar during build

    new BellOnBundleErrorPlugin(),

    new FixDefaultImportPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),

    // new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js', Infinity),

    new webpack.optimize.CommonsChunkPlugin({ 
      name: 'vendor',                                                // file name
      filename: 'vendor.js',
      minChunks: Infinity
    }),


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
