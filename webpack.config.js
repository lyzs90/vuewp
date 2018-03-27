import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

require('dotenv').config();

module.exports = {
  resolve: {
    modules: ['./node_modules'],
  },

  entry: {
    main: './wp-content/themes/vuewp/app/app.js',
    vendor: ['vue', 'vue-router'],
  },

  output: {
    path: path.resolve('wp-content/themes/vuewp/dist/js'),
    filename: '[name].[chunkhash].min.js',
    chunkFilename: '[name].[chunkhash].min.js',
    publicPath: './js/', // relative to dist
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 25000, // inline files below 25kb
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
      },

      // Accessible as a global in VueJS
      WP_HOME: `'${process.env.WP_HOME}'`,
    }),

    // Generate new index.html file with script tags
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'wp-content/themes/vuewp/index.html'),
      filename: path.resolve(__dirname, 'wp-content/themes/vuewp/dist/index.html'),
    }),

    // Extract common dependencies into an existing entry chunk or an entirely // new chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
    }),
  ],
};
