const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = [
  merge(common, {
    mode: "production",
    devtool: "source-map",
    output: {
      filename: "particles.min.js",
      libraryTarget: "window",
    },
  }),
  merge(common, {
    mode: "production",
    devtool: "source-map",
    output: {
      filename: "particles.js",
      libraryTarget: "commonjs2",
    },
    optimization: {
      minimize: false,
    },
  }),
];
