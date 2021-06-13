const webpack = require('webpack');
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin'); 

module.exports = {
  entry: './src/index.js',
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
      rules: [
          {
              test: /\/.js|jsx$/i,
              exclude: /(node_modules)/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: ["@babel/preset-env", "@babel/preset-react"],    
                }
              }
          },
          {
            test: /\.css$/,
            use: [
              'style-loader',
              'css-loader'
            ]
          },
          {
            test: /\.(png|jpg)$/,
            loader: 'url-loader'
          }
      ]
  },
 
  plugins: [new HtmlWebpackPlugin({template: './index.html',})]


 
};