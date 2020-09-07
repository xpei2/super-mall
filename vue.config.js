const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  devServer: { // 环境配置
    // public: 'http://bk.hosts.run/vue%E5%AD%A6%E4%B9%A0/dist/',
    open: true, // 配置自动启动浏览器,
    disableHostCheck: true
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('_ats', resolve('src/assets'))
      .set('_con', resolve('src/common'))
      .set('_com', resolve('src/components'))
      .set('_vie', resolve('src/views'))
      .set('_new', resolve('src/network'))

    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|webp|jfif)(\?.*)?$/)
  },
}
