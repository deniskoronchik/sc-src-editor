var webpack = require('webpack');
module.exports = {
  target: "electron",
  entry: {
    app: ['webpack/hot/dev-server', './app/app.js'],
  },
  resolve: {
      extensions: ['', '.js', '.jsx', '.css', '.less'],
  },
  output: {
    path: './public/',
    filename: 'bundle.js',
    publicPath: 'http://localhost:8080/'
  },
  devServer: {
    contentBase: './public/',
    publicPath: 'http://localhost:8080/'
  },
  module: {
   loaders: [
     { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
     { test: /\.css$/, loader: 'style-loader!css-loader' },
     { test: /\.less$/, loader: 'style-loader!css-loader!less-loader'}
   ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}
