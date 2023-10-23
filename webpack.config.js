const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  watch: true,
  mode: "development",
  devtool: "source-map",
  stats: "minimal",
  output: {
    filename: "bundle.js",
  },

  plugins: [
    new MiniCssExtractPlugin({filename: 'bundle.css'}),
  ],
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
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
};