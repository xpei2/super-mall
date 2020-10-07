module.exports = {
    plugins: {
        autoprefixer: {},
        "postcss-px-to-viewport": {
            viewportWidth: 375, //视口的宽度，对应的使我们设计稿的宽度
            viewportHeight: 667, //视口的高度，对应的是设计稿的高度（可不配置）
            unitPrecision: 5, //指定`px`转换为视口单位值的小数位数（很多时候无法整除）
            viewportUnit: 'vw', //指定需要转换成的视窗单位，建议用vw
            // selectorBlackList: ['nav-bar', 'tab-bar', 'tab-bar-item', '#home', '.home-scroll'], //需要忽略的CSS选择器，果传入的值为字符串的话，只要选择器中含有传入值就会被匹配
            minPixelValue: 1, //设置最小的转换数值，如果为1的话，只有大于1的值会被转换
            mediaQuery: false, //媒体查询里的单位是否需要转换单位
        },
    }
};
