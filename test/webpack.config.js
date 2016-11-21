'use strict'

const path = require('path')
const webpack = require('webpack')
const srcPath = path.join(__dirname, '..', 'src')
const port = 8000
const publicPath = '/'

module.exports = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:' + port,
    'webpack/hot/only-dev-server',
    './app.js'
  ],
  cache: true,
  devtool: 'eval-source-map',
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  port: port,
  debug: true,
  devtool: 'eval',
  output: {
    path: __dirname,
    filename: 'built.js',
    publicPath: publicPath
  },
  devServer: {
    contentBase: '.',
    historyApiFallback: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    hot: true,
    inline: true,
    port: port,
    publicPath: publicPath,
    noInfo: false
  },
  resolve: {
    extensions: ['', '.js', 'jsx']
  },
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        include: srcPath,
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      {
        test: /\.less/,
        loader: 'css-loader!less-loader'
      },
      {
        test: /\.(svg)$/,
        loader: 'url-loader'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  }
}
