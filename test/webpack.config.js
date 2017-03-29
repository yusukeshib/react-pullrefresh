'use strict'

const path = require('path')
const webpack = require('webpack')
const srcPath = __dirname
const port = 8080
const publicPath = '/'

module.exports = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:'+port,
    'webpack/hot/only-dev-server',
    './index.js'
  ],
  cache: true,
  devtool: 'eval',
  plugins: [
    new webpack.LoaderOptionsPlugin({ debug: true }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
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
    extensions: ['.js', 'jsx'],
    alias: {
      'react-pullrefresh':  `${srcPath}/src`
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        include: srcPath,
        loader: 'eslint-loader'
      },
      {
        test: /\.(css)$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ["es2015", "stage-1", "react"],
          plugins: [
            "react-hot-loader/babel",
          ]
        }
      }
    ]
  }
}
