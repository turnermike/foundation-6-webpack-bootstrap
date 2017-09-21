"use strict"

// load modules
const webpack = require('webpack');
const path = require('path');
//const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const BellOnBundleErrorPlugin = require('bell-on-bundler-error-plugin');
const FixDefaultImportPlugin = require('webpack-fix-default-import-plugin');
const { getIfUtils, removeEmpty } = require('webpack-config-utils');
const pkg = require('./package.json');

// // look for --watch parameter used via cli/npm run
// var isWatched = process.argv.indexOf('--watch');
// isWatched = (isWatched > 0) ? true : false;
// console.log('isWatched',isWatched);

// environment setup
var env = process.env.NODE_ENV;                                       // NODE_ENV variable set in package.json for each run ("scripts") command
const { ifProd, ifNotProd } = getIfUtils(env);                        // define ifProd and ifNotProd functions

// set image/font paths
var image_path = ifProd("'http://mydomain.com/images'", "'../images'");
var font_path = ifProd("'http://mydomain.com/fonts'", "'../fonts'");

// debug output
console.log('-------------------------------------------------------');
console.log('-- Start Debug --');
console.log('ifProd:', ifProd('true', 'false'));
console.log('pkg.dependencies', pkg.dependencies);
console.log('image_path', image_path);
console.log('font_path', font_path);
console.log('-- End Debug --');
console.log('-------------------------------------------------------');

module.exports = {

  context: path.resolve(__dirname, '.'),                            // base dir

  devtool: ifProd('source-map', 'cheap-eval-source-map'),           // use full source map for prod, cheap and dirty for dev

  // cache: false,

  entry: {                                                          // entry points
    app: [ 
      './js/alert.js',
      './js/main.js',
      './scss/app.scss'
    ],
    // vendor: ['jquery', 'sticky-js']
    vendor: Object.keys(pkg.dependencies)
  },

  output: {
    path: path.resolve(__dirname, './output'),                      // js output dir
    filename: '[name].js',                                          // js bundled file name
    chunkFilename: '[name]-[chunkhash].js'
  },

  resolve: {
    modules: [
      path.resolve(__dirname, './node_modules'),
    ]
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
                outputStyle: 'expanded',                             // code formating for css (compressed, expanded, nested, compact)        
                data: "$image-path: " + image_path + "; $font-path: " + font_path + ";"             // pass path vars
                // data: "$image-path: " + image_path + ";",


              }
            },
            {
              loader: 'sass-resources-loader',
              options: {
                resources: [
                  path.resolve(__dirname, 'node_modules/bootstrap-sass/assets/stylesheets/bootstrap/_variables.scss'),
                  path.resolve(__dirname, 'node_modules/bootstrap-sass/assets/stylesheets/bootstrap/mixins/*.scss'),
                  path.resolve(__dirname, 'scss/_bootstrap_sass_vars.scss'),
                  path.resolve(__dirname, 'node_modules/bootstrap-sass/assets/stylesheets/bootstrap/_normalize.scss'),
                  path.resolve(__dirname, 'node_modules/bootstrap-sass/assets/stylesheets/bootstrap/_print.scss'),
                  path.resolve(__dirname, 'node_modules/bootstrap-sass/assets/stylesheets/bootstrap/_glyphicons.scss'),
                  path.resolve(__dirname, 'node_modules/bootstrap-sass/assets/stylesheets/bootstrap/_scaffolding.scss'),
                  path.resolve(__dirname, 'node_modules/bootstrap-sass/assets/stylesheets/bootstrap/_type.scss'),
                  path.resolve(__dirname, 'node_modules/bootstrap-sass/assets/stylesheets/bootstrap/_code.scss'),
                  path.resolve(__dirname, 'node_modules/bootstrap-sass/assets/stylesheets/bootstrap/_grid.scss'),
                  path.resolve(__dirname, 'node_modules/bootstrap-sass/assets/stylesheets/bootstrap/_tables.scss'),
                  path.resolve(__dirname, 'node_modules/bootstrap-sass/assets/stylesheets/bootstrap/_buttons.scss')

                  
                ]
              }
            }
          ]
        })
      },

      {
        test: /\.(woff|woff2|ttf|eot|svg)$/,
        include: [path.resolve(__dirname, '.')],
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          useRelativePath: true
          // limit: 100000
        }
      },

      {
        test: /\.(png|svg|jpg|gif)$/,
        // loader: 'url-loader'                  
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          useRelativePath: true
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
    
    // new ProgressBarPlugin(),                                        // display a progress bar during build

    new BellOnBundleErrorPlugin(),

    new FixDefaultImportPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),

    // new webpack.optimize.CommonsChunkPlugin({ 
    //   name: 'vendor',                                                // file name
    //   filename: 'vendor.js',
    //   minChunks: Infinity
    // }),

    new webpack.ProvidePlugin({
      $: 'jquery',
      Sticky: 'sticky-js'
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
          // sourceMap: ifProd(false, true),                           // source map for browser dev tools
          // sourceMapContents: true                                   // doesn't seem to do anything

        },
        urlLoader: {
          publicPath: '/'
        },
        context: '/'
      }
    }),    

    ifProd(new webpack.optimize.UglifyJsPlugin({                    // js minification, applied to prod only
      debug: ifProd(false, true),
      minimize: ifProd(false, false),
      sourceMap: true,
      output: {
        comments: ifProd(false, true),
      },
      compressor: {
        screw_ie8: true,                                            // ignore ie8
        warnings: true                                              // show warnings
      },
      
    }))

  ])

};
