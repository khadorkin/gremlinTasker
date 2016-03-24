var webpack = require('webpack');
var uglify = new webpack.optimize.UglifyJsPlugin();

module.exports = {
  entry: './public/javascripts/main.jsx',
  output: {
    path: 'public/dist',
    filename: 'app.min.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  plugins: [uglify]
};
