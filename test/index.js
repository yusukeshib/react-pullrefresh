var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require('./webpack.config')

new WebpackDevServer(webpack(config), config)
.listen(config.port, '0.0.0.0', function(err) {
  if (err) console.error(err)
  console.log('Listening at localhost:' + config.port)
})
