const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    main: [
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client',
      path.join(__dirname, 'src/index.js')
    ]
  },
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: ''
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};