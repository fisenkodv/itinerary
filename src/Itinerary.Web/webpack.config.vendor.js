const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');

module.exports = (env) => {
  const extractCss = new ExtractTextPlugin('vendor.css');
  const isDevBuild = !(env && env.prod);
  const sharedConfig = {
    stats: { modules: false },
    resolve: { extensions: ['.js'] },
    module: {
      rules: [
        { test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/, use: 'url-loader?limit=100000' }
      ]
    },
    entry: {
      vendor: [
        '@angular/common',
        '@angular/compiler',
        '@angular/core',
        '@angular/http',
        '@angular/platform-browser',
        '@angular/platform-browser-dynamic',
        '@angular/router',
        '@angular/platform-server',
        'es6-shim',
        'es6-promise',
        'event-source-polyfill',
        'zone.js',
        'hammerjs'
      ]
    },
    output: {
      publicPath: '/dist/',
      filename: '[name].js',
      library: '[name]_[hash]'
    },
    plugins: [
      new webpack.ContextReplacementPlugin(/\@angular\b.*\b(bundles|linker)/, path.join(__dirname, './Client')), // Workaround for https://github.com/angular/angular/issues/11580
      new webpack.IgnorePlugin(/^vertx$/) // Workaround for https://github.com/stefanpenner/es6-promise/issues/100
    ]
  };

  const clientBundleConfig = merge(sharedConfig, {
    output: { path: path.join(__dirname, 'wwwroot', 'dist') },
    module: {
      rules: [
        { test: /\.css(\?|$)/, use: extractCss.extract({ use: 'css-loader' }) }
      ]
    },
    plugins: [
      extractCss,
      new webpack.DllPlugin({
        path: path.join(__dirname, 'wwwroot', 'dist', '[name]-manifest.json'),
        name: '[name]_[hash]'
      })
    ].concat(isDevBuild ? [] : [
      new webpack.optimize.UglifyJsPlugin()
    ])
  });

  return [clientBundleConfig];
}
