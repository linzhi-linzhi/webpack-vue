const merge = require('webpack-merge')
const common = require('./webpack.base.config')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    new OptimizeCssAssetsPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        parallel: true, // 使用多进程提高构建速度
        extractComments: false,
		    terserOptions: {
          compress: {
            drop_console: true,
            pure_funcs: ['console.log']
          },
          output: {
            comments: false
          }
        }
      }),
    ],
    splitChunks: {
      chunks: 'all',
      maxAsyncRequests: 8,
      maxInitialRequests: 6,
      minSize: 10000,
      cacheGroups: {
        // react: {
        //   name: 'chunk-react',
        //   test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
        //   priority: 20
        // },
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    }
  },
})