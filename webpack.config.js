module.exports = {
  watch: true,
  mode: "development",
  devtool: "eval-source-map",
  stats: "minimal",
  output: {
    filename: "bundle.js",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        }
      }
    ]
  },
};