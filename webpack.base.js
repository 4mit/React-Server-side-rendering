const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // Tell webpack to run babel on every file it runs through
  // SSR doesnt work with css loader alone since there will be no Document Object available while rendering in server
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            '@babel/preset-react',
            ['@babel/env', { targets: { browsers: ['last 2 versions'] } }],
          ],
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        // use: ['style-loader', 'css-loader']
      },
      // ,
      // {
      //   test: /\.css$/i,
      //   use: ['style-loader', 'css-loader'],
      // },
    ],
  },
};
