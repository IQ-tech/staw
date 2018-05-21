const path = require('path')
const webpack = require('webpack')
const postStylus = require('poststylus')
const rupture = require('rupture')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index.js',
		libraryTarget: 'commonjs2'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				include: path.resolve(__dirname, 'src'),
				exclude: /(node_modules|bower_components|dist)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['react']
					}
				}
			},
			{
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: false,
                sourceMap: false,
                minimize: true,
                discardComments: { removeAll: true }
              }
            },
            'stylus-loader'
          ]
        })
    	}
		]
	},
	plugins: [
		new webpack.LoaderOptionsPlugin({
			test: /\.styl$/,
			stylus: {
				preferPathResolver: 'webpack',
				default: {
					use: [
						postStylus([
							'rucksack-css',
							'css-mqpacker',
							'autoprefixer',
						]),
						rupture()
					]
				}
			},
			options: {
				context: __dirname
			}
		}),
		new ExtractTextPlugin({
			filename: 'Staw.css',
			allChunks: true
		}),
		new webpack.ProvidePlugin({
			React: 'react'
		})
	],
	externals: {
		'react': 'commonjs react'
	}
}
