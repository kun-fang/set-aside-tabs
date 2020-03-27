'use strict'
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");

const path = require("path");
const srcPath = path.join(__dirname, "src");

module.exports = {
  context: srcPath,
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  entry: {
    sidebar: './sidebar/sidebar.js',
    background: './background/background.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "vue-style-loader",
          "css-loader"
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: "file-loader?name=[name].[ext]",
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({}),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: "sidebar/sidebar.html",
      filename: "sidebar.html",
    }),
    new CopyWebpackPlugin([{
      from: "./manifest.json",
      to: "./manifest.json"
    }]),
  ]
}