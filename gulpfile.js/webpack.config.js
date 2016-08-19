var webpack = require('webpack');
var config = require('./config');
var path = require('path');

module.exports = {
  cache: true,
  entry: [
    'babel-polyfill',
    path.resolve(config.paths.jsDir + '/main.js')
  ],
  output: {
    path: path.resolve(config.paths.tmpDir + '/js'),
    publicPath: '/js/',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['jsx', 'babel'],
        exclude: /node_modules/
      },
      {
        test: /\.(scss|sass)$/,
        loader: 'style!css!sass',
        exclude: [/node_modules/, path.resolve(config.paths.sassDir), path.resolve(config.paths.publicDir), path.resolve(config.paths.tmpDir)]
      },
      {
        test: /\.svg/, 
        loader: 'svg-url-loader',
        exclude: /node_modules/
      },
      {
        test: /\.png$/,
        loader: "url-loader",
        query: { mimetype: "image/png" }
      },
      {
        test: /\.json$/,
        loader: 'json',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.css', '.json'],
    alias: {
      react: 'react/dist/react.min',
      'react-dom': 'react-dom/dist/react-dom.min',
      jquery: "jquery/dist/jquery",
      "jquery-ui": "jquery-ui/jquery-ui",
      bootstrap: 'bootstrap-sass/assets/javascripts/bootstrap.min',
      "jquery-scrollto": "jquery.scrollto/jquery.scrollTo.min",
      data: __dirname + '/../src/assets/js/data',
      "react-addons-css-transition-group": __dirname + '/../node_modules/react/lib/ReactCSSTransitionGroup'
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      jQuery: "jquery",
      $: "jquery",
      "window.jQuery":"jquery"
    })
  ]
}