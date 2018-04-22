var config = {
  entry: {
  app : './index.js'
  },

  output:{
    filename: '[name].bundle.js',
    path: __dirname,
    publicPath: __dirname
  },
  mode : 'development',

  devServer:{
    inline: true,
    port: 8080
  },

  module:{
    rules:[
      {
        test: /\.jsx?$/,
        exclude : /node_modules/,
        loader : 'babel-loader',

        query:{
          presets : ['es2015', 'react']
        }
      },
      { test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader'
      }]
  }

}

module.exports = config;
