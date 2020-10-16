const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    // productionSourceMap：{ type:Bollean,default:true } 生产源映射，如果您不需要生产时的源映射，那么将此设置为false可以加速生产构建
    productionSourceMap: false,
    // https://www.my-app.com/。如果应用程序部署在子路径上，则需要使用此选项指定子路径。例如，如果您的应用程序部署在https://www.xxx.com/my-app/，集baseUrl到'/my-app/'.
    publicPath: process.env.NODE_ENV === 'production' ? '/super/' : '/',
    // 环境配置
    devServer: {
        // port: 8085, // 端口号
        // public: 'http://bk.hosts.run/super/dist/',
        open: true, // 配置自动启动浏览器,
        disableHostCheck: true,
        // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
        // proxy: {
        //     '/api': {
        //         target: '<url>',
        //         ws: true,
        //         changeOrigin: true
        //     },
        //     '/foo': {
        //         target: '<other_url>'
        //     }
        // },  // 配置多个代理
    },
    // 配置规则
    chainWebpack: (config) => {
        // 使用配置 html-webpack-plugin 插件 生成发布html标题
        config.plugin('html')
            .tap(args => {
                args[0].title = '千羽商城'
                return args
            })
        // 文件夹简写
        config.resolve.alias
            .set('_ats', resolve('src/assets'))
            .set('_con', resolve('src/common'))
            .set('_com', resolve('src/components'))
            .set('_vie', resolve('src/views'))
            .set('_new', resolve('src/network'))
        //图片格式
        config.module
            .rule('images')
            .test(/\.(png|jpe?g|gif|webp|jfif)(\?.*)?$/)
    },


}
