const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.base.config')
const webpack = require('webpack')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
  },
  devServer: {
    open: false,
    port: 9000,
    compress: true,
    hot: true,
    inline: true,
    proxy: {
      '/proxy': { // 代理标识 /proxy，匹配拦截的规则
        target: 'https://192.111:8800', // 目标地址，有端口号
        ws: true, // 是否支持 web socket
        changeOrigin: true, // 是否支持虚拟主机站点
        secure: false, // 代理目标地址为https时需设置secure为false
        pathRewrite: {
          '^/proxy': '' // 配置代理后将/proxy替换为空字符串，即在实际接口地址中去掉/proxy
        }
      }
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})