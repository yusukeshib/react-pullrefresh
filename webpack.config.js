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
		preLoaders: [
			{
				test: /\.(js|jsx)$/,
				include: 'src',
				loader: 'eslint-loader'
			}
		],
		loaders: [
			{
				test: /\.(js|jsx)$/,
				loader: 'babel-loader'
			},
			{
				test: /\.less/,
				loader: 'css-loader!less-loader'
			},
			{
				test: /\.(svg)$/,
				loader: 'url-loader?limit=8192'
			}
		]
	},
	resolve: {
		modulesDirectories: ['node_modules']
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
