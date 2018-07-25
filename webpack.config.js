var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'js');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
  entry: APP_DIR + '/cantilever.js',
  output: {
    path: BUILD_DIR,
    filename: 'cantilever.js',
    libraryTarget: 'var',
    library: 'Cantilever'
  },
  module : {
    loaders : [
      {
        test : /\.js?/,
        include : APP_DIR,
        loader : 'babel-loader'
      }
    ]
  }
};

module.exports = config;
