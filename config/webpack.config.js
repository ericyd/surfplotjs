/**
 * For more info on any of this, check out:
 * 1. https://github.com/verekia/js-stack-from-scratch/tree/master/tutorial/7-client-webpack
 * 2. create-react-app hello-world
 */

const paths = require('./paths');
const path = require('path');
const StyleLintPlugin = require('stylelint-webpack-plugin');

// process.env.NODE_ENV is set in scripts/build.js
const entryScript = process.env.NODE_ENV === 'desktop' ? paths.appDesktopJs : paths.appIndexJs;
const buildPath = process.env.NODE_ENV === 'desktop' ? paths.appDesktopBuild : paths.appBuild;

module.exports = {
  entry: [
    require.resolve('./polyfills'),
    entryScript
  ],
  output: {
    filename: `bundle.js`,
    path: buildPath,
    publicPath: "/",
  },
  devServer: { 
    inline: true 
  },
  devtool: 'eval',
  // devtool: 'source-map',
  plugins: [
    new StyleLintPlugin({
      configFile: './config/stylelint.config.js',
      syntax: 'scss',
      failOnError: false
    }),
  ],
  eslint: {
    configFile: 'config/.eslintrc'
  },
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        include: paths.appSrc,
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: paths.appSrc,
        exclude: [/node_modules/],
      },
      {
        test: /\.(sc|sa|c)ss$/,
        loaders: ["style", "css", "sass"]
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};