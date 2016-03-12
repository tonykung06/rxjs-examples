module.exports = {
  entry: './app/scripts/app.js',
  output: {
    path: __dirname,
    filename: './build/bundle.js'
  },
  module: {
    loaders: [
      {
        test: /.js$/,
        loader: 'babel-loader',
        query: {
          presets: [
            'es2015'
          ]
        }
      }
    ]
  },
};
