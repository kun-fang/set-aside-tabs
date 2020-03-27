'use strict'

const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base.js');
const path = require("path");

module.exports = merge(baseConfig, {
  mode: 'production',
  output: {
    path: path.join(__dirname, "release"),
    filename: "[name].js"
  }
});
