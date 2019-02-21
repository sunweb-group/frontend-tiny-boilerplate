const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const buildPath = path.resolve(__dirname, '_dist')
const scriptsOutputPath = 'js'
const stylesOutputPath = 'css'
const imagesOutputPath = 'img'
const fontsOutputPath = 'fonts'

module.exports = {
  mode: 'production',
  target: 'web',
  entry: {
    'main': [
      path.resolve(__dirname, `scripts/main.js`),
      path.resolve(__dirname, `styles/main.scss`)
    ]
  },
  output: {
    filename: '[name].js',
    path: path.posix.join(buildPath, scriptsOutputPath),
    sourceMapFilename: '[name].map'
  },
  plugins: [
    // ENV needs to be production because full Babel transformations are applied then
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new MiniCssExtractPlugin({
      filename: path.posix.join('..', stylesOutputPath, '[name].css'),
      allChunks: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|ejs)$/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
        query: {
          limit: '8192',
          name: path.posix.join('..', fontsOutputPath, '[name].[hash].[ext]')
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
        query: {
          limit: '8192',
          name: path.posix.join('..', imagesOutputPath, '[name].[hash].[ext]')

        }
      },
      {
        test: /\.scss$/,
        exclude: /(node_modules)/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, '../')
    ]
  },
  devtool: 'source-map'
}
