const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { VueLoaderPlugin } = require('vue-loader');

const cssTest = /\.css$/
const lessTest = /\.less$/
const cssModuleTest = /\.module\.css$/
const lessModuleTest = /\.module\.less$/
const baseCssUse = [
  MiniCssExtractPlugin.loader, 
  'css-loader', 
  'postcss-loader'
]
const baseCssModuleUse = [
  MiniCssExtractPlugin.loader, 
  {
    loader: 'css-loader',
    options: {
      modules: {
        localIdentName: "[name]_[local]__[hash:5]"
      }
    },
  }, 
  'postcss-loader'
]

module.exports = {
  entry: {
    app: './src/index.js',
  },
  output: {
    filename: 'js/[name].[contenthash:8].js',
    chunkFilename: 'js/[name].[contenthash:8].js',
    path: path.resolve(__dirname, '../dist'),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      inject: 'body',
      hash: false
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/static',
          to: 'static'
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
      ignoreOrder: true
    }),
    new webpack.DefinePlugin({
      // VERSION_H5: +new Date(),
      'process.env': Object.keys(process.env).reduce(
        (env, key) => {
          env[key] = JSON.stringify(process.env[key]);
          return env;
        }, 
        {}
      )
    }),
    new VueLoaderPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        options: {
          cacheDirectory: true
        },
        loader: 'babel-loader'
      },
      {
        test: cssTest,
        exclude: cssModuleTest,
        use: baseCssUse
      },
      {
        test: lessTest,
        exclude: lessModuleTest,
        use: [...baseCssUse, 'less-loader']
      },
      {
        test: cssModuleTest,
        use: baseCssModuleUse
      },
      {
        test: lessModuleTest,
        use: [...baseCssModuleUse, 'less-loader']
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        options: {
          esModule: false,
          limit: 4096,
        },
        loader: 'url-loader',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        options: {
          esModule: false
        },
        loader: 'file-loader'
      },
      {
        test:/\.vue$/,
        use: {
          loader: 'vue-loader'
        }
      },
    ]
  },
}