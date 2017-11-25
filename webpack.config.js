const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: {
    index: [
      'regenerator-runtime/runtime',
      './src/index'
    ]
  },
  watch: false,
  context: __dirname,
  output: {
    path: path.join(__dirname, 'lib'),
    filename: '[name].js',
    pathinfo: false,
    library: 'index',
    libraryTarget: 'umd'
  },
  module:{
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.join(__dirname, 'src'),
        enforce: 'pre',
        loader: 'eslint-loader'
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: [
            [ 'env' , {
              targets: {
                browsers: ['last 2 versions', 'safari >= 7']
              }
            }],
            'react'
          ],
          plugins: [
            'transform-function-bind',
            'transform-object-rest-spread'
          ]
        }
      },
      {
        test: /\.(css)$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(svg)$/,
        loader: 'url-loader'
      }
    ]
  },
  externals: [ nodeExternals() ]
}
