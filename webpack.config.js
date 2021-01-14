/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlReplaceWebpackPlugin = require('html-replace-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const WorkboxPlugin = require('workbox-webpack-plugin');
const pk = require('./package.json');

module.exports = (env) => {
  const CONTENT_BASE = env.CONTENT_BASE || '';
  const PUBLIC_URL = env.PUBLIC_URL || '';
  const publicUrl = PUBLIC_URL + CONTENT_BASE;
  return {
    entry: './src/index.ts',
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    output: {
      path: path.join(__dirname, '/dist'),
      filename: '[name].[hash].js',
      sourceMapFilename: '[file].map[query]',
      publicPath: '/',
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
    devServer: {
      historyApiFallback: true,
      contentBase: path.join(__dirname, 'public'),
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.APP_NAME': JSON.stringify(pk.name),
        'process.env.APP_VERSION': JSON.stringify(pk.version),
        'process.env.APP_HOMEPAGE': JSON.stringify(pk.homepage),
      }),
      new Dotenv(),
      new CopyWebpackPlugin({
        patterns: [
          {
            context: path.resolve('./public/'),
            from: './**/*',
            to: path.resolve('./dist'),
            force: true,
          },
        ],
      }),
      new HtmlWebpackPlugin({
        path: path.resolve('./dist'),
        template: './public/index.html',
      }),
      new HtmlReplaceWebpackPlugin([
        {
          pattern: '%PUBLIC_URL%',
          replacement: publicUrl,
        },
        {
          pattern: '%TITLE%',
          replacement: 'Jtyper',
        },
        {
          pattern: '%SCRIPTS%',
          replacement: '',
        },
        {
          pattern: '%STYLES%',
          replacement: '',
        },
      ]),
      new WorkboxPlugin.GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
        maximumFileSizeToCacheInBytes: 5000000,
      }),
    ],
  };
};
