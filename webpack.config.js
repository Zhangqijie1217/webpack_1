const path = require('path');//node的核心模块
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {//common.js语法
	mode: 'development',
	entry: {
		main: './src/index.js'
	},//从哪个文件开始打包
	module: {
		rules: [{
			test: /\.(jpg|png|gif)$/,
			use: {
				loader: 'url-loader',//如果没有加limit会把图片打包成一个base64打包到js里
				options: {
					name: '[name]_[hash].[ext]',	//打包之后的名字构成
					outputPath: 'images/',	//打包到images的文件夹中
					limit: 2048,	//如果大于2048字节会生成一个img文件夹，如果小于就会打成base64
				},
			}
		},{
			test: /\.vue$/,
			use: {
				loader: 'vue-loader'
			}
		},{
			test: /\.(eot|ttf|svg|woff)$/,
			use: {
				loader: 'file-loader'
			}
		},{
			test: /\.scss$/,
			use: [
				'style-loader', 
				{
					loader: 'css-loader',
					options: {
						importLoaders: 2,
					},
				},
				'sass-loader',
				'postcss-loader'	//添加兼容前缀
			] //从上到下，从左到右
		}]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		}) 
	],
	output: {//打包文件放到哪，把index.js打包生成一个bundle文件夹下面生成一个bundle.js
			filename: 'dist.js',//打包好的文件取个名字
			path: path.resolve(__dirname, 'dist') //打包出的文件放在哪一个文件夹下，__dirname指的是当前webpack.config.js所在的当前这个目录的路径
	}
}