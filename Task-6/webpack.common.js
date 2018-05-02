const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
  	index: './src/index.ts'
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
   	new CleanWebpackPlugin(['dist']),
   	new HtmlWebpackPlugin({
   		template: './src/index.html',
   		minify: {
   			collapseWhitespace: true,
   			collapseBooleanAttributes: true,
   			minifyCSS: true,
   			removeScriptTypeAttributes: true
   		}
   	}),
   	new webpack.HotModuleReplacementPlugin()
  ]
};