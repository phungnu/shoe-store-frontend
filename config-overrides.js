const webpack = require('webpack');

module.exports = function override(config) {
  // Thêm fallback cho các module cần thiết
  config.resolve.fallback = {
    ...config.resolve.fallback,
    util: require.resolve('util/'),
    url: require.resolve('url/'),
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    path: require.resolve('path-browserify'),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    zlib: require.resolve('browserify-zlib'),
    assert: require.resolve('assert/'), // Thêm polyfill cho assert
    fs: false
  };

  // Thêm các plugin cần thiết
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ]);

  return config;
};
