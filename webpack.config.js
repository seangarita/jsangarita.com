var path = require("path");
var webpack = require("webpack");

var isProd = process.env.NODE_ENV === "production";
var isDev = !isProd;

module.exports = {
  entry: "./src/webapp.jsx",
  output: {
    filename: "build.js",
    path: path.resolve(__dirname, "build")
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: {
          presets: ["es2015"]
        }
      },
      {
        test: /\.jsx$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: {
          presets: ["es2015", "react"]
        }
      }
    ]
  },
  devServer: {
    host: "0.0.0.0",
    contentBase: path.join(__dirname, "public"),
    publicPath: "http://0.0.0.0:8080/build/",
    hot: true
  },
  plugins: isProd
  ? [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("production")
      }
    })
  ]
  : [new webpack.HotModuleReplacementPlugin()]
};
