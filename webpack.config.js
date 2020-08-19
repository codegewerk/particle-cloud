const path = require("path");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "src", "index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "particles.js",
    library: "particles",
  },
  devtool: "source-map",
};
