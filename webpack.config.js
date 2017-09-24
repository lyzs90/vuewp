import webpack from "webpack";
import path from "path";

module.exports = {
  resolve: {
    modules: ["./node_modules", "./wp-content/themes/vuewp/js"]
  },

  entry: {
    main: "./wp-content/themes/vuewp/app/app.js",
    vendor: ["vue", "vue-router"]
  },

  output: {
    path: path.join(__dirname, "wp-content/themes/vuewp/js"),
    filename: "[name].min.js",
    publicPath: "./js/"
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 25000 // inline files below 25kb
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin()
  ]
};
