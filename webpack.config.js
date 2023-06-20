module.exports = {
  watch: true,
  mode: "development",
  devtool: "source-map",
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
      },

      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ]
  },
};