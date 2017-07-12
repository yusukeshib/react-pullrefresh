const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: {
    index:'./src/index'
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
            'es2015',
            'react',
            'stage-1'
          ],
          env: {
            'development': {
              'sourceMaps': 'inline'
            }
          }
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
  resolve: {
    modules: ['node_modules']
  },
  externals: [ nodeExternals() ]
}
