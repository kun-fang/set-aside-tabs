'use strict'
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");

const path = require("path");

const { generateMenifest } = require("./firefox.extension.build.js");
const packageConfig = require("./package.json");

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
      from: "./config.json",
      to: "./manifest.json",
      transform: (content, path) => {
        let config = generateMenifest(JSON.parse(content), packageConfig);
        return Buffer.from(JSON.stringify(config, null, 2));
      }
    }]),
  ]
}