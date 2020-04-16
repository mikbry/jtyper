/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlReplaceWebpackPlugin = require('html-replace-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: './src/index.ts',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].[hash].js',
    sourceMapFilename: '[file].map[query]',
  },
  module: {
    rules: [
      {
        test: /\.((tsx?)|(jsx?))$/,
        exclude: /node_modules|__tests__/,
        loader: 'awesome-typescript-loader',
      },
      {
        test: /\.(vert|frag|vs|fs)$/i,
        use: 'raw-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        loader: 'svg-url-loader',
      },
    ],
  },
  devtool: 'source-map',
  plugins: [
    new CopyWebpackPlugin([
      {
        context: path.resolve('./public/'),
        from: './**/*',
        to: path.resolve('./dist'),
        force: true,
      },
    ]),
    new HtmlWebpackPlugin({
      path: path.resolve('./dist'),
      template: './public/index.html',
    }),
    new HtmlReplaceWebpackPlugin([
      {
        pattern: '%PUBLIC_URL%',
        replacement: isDevelopment ? 'http://localhost:9010' : 'https://mikbry.github.io/jtyper',
      },
      {
        pattern: '%TITLE%',
        replacement: 'Jtyper',
      },
    ]),
  ],
};
