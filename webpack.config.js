var webpack = require('webpack');

var path = require('path');
var PATH = {
	app:path.join(__dirname,"src","js","App.js")//src/js/App.js

}
module.exports = {
	entry:{
		app:PATH.app,
		vendor:['react','react-dom','react-router']   //把业务代码与框架代码分开
	},
	output:{
		filename:'[name].js'
	},
	resolve:{
		alias:{
			"~":path.resolve(__dirname),
			'$tool':path.join(__dirname,"src","js","tool")
		},
		extensions:['.js','.css']

	},
	module:{
		loaders:[{
			test:/\.js$/,
			loader:'babel-loader',
			exclude:/node_modules/ 
		},{
			test:/\.css$/,
			loader:'style-loader!css-loader',
			exclude:/node_modules/
		}]
	},
	plugins:[new webpack.optimize.CommonsChunkPlugin({
		name:['vendor']// 把公共的js片段抽离
	}),
	new webpack.ProvidePlugin({
		React:'react'
	}) 
	/*,new htmlPlugin({
		title:'webpackReact'

	})*/
	]

}