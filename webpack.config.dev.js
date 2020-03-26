'use strict'
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");

const path = require("path");
const srcPath = path.join(__dirname, "src");
const outputPath = path.join(__dirname, "dist");

const imageFileExts = ["jpg", "jpeg", "png", "gif", "eot", "otf", "svg", "ttf", "woff", "woff2"];


module.exports = {
  context: srcPath,
  mode: 'development',
  devtool: "inline-source-map",
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
    }
  },
  entry: {
    sidebar: './sidebar/sidebar.js',
    background: './background/background.js'
  },
  output: {
    path: outputPath,
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "vue-style-loader",
          //"style-loader",
          "css-loader"
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: "file-loader?name=icons/[name].[ext]",
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