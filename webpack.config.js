const path = require('path')

module.exports = {
  entry: {
    index:'./src/index'
  },
  watch: false,
  context: __dirname,
  output: {
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
        loader: 'babel-loader'
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
  externals: {
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react'
    }
  }
}
