var webpack = require('webpack'),
	path 	= require('path');

module.exports = {

	resolve: {
		moduleDirectories: ['./node_modules', './public/app/themes/vuewp/js']
	},

	entry: {
		main: './public/app/themes/vuewp/app/app.js',
		vendor: ['vue', 'vue-router']
	},

	output: {
		path: path.join(__dirname, 'public/app/themes/vuewp/js'),
		filename: '[name].min.js'
	},

	module: {

		loaders: [
	    	{
		        test:     /\.js$/,
		        loader:   'babel-loader',
		        exclude: /node_modules/
	      	},
      		{
        		test: /\.vue$/,
        		loader: 'vue'
      		},
      		{
        		test: /\.(png|jpg|gif)$/,
        		loader: 'url',
      		}			
		]

	}

} 

