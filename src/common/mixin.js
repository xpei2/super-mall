import {
    debounce
} from './utils'

// 监听商品图片加载完全运行refresh方法
export const goodsListenerMixin = {
    data() {
        return {
            goodstImgListener: null
        }
    },
    mounted() {
        // 1.监听商品图片加载完成
        const refresh = debounce(this.$refs.scroll.refresh, 50);

        this.goodstImgListener = () => refresh();

        this.$bus.$on('itemImageLoad', this.goodstImgListener);
    }
}

// 监听swiper图片加载
export const swiperListenerMixin = {
    data() {
        return {
            swiperImgListener: null
        }
    },
    mounted() {
        this.$bus.$on('swiperImgLoad', this.swiperImgListener);
    }
}

// 回到顶部按钮混入
export const backTopMixin = {
    data() {
        return {
            // 滚动位置
            curPosition: 0
        }
    },
    components: {
        BackTop: () => import('_com/content/back-top/BackTop'),
    },
    computed: {
        isBackTop() {
            return this.curPosition >= 1500
        }
    },
    methods: {
        // 回到顶部
        backClick() {
            // 调用子组件里面封装的scrollTo方法即可
            this.$refs.scroll.scrollTo(0, 0);
        },
    }
}
// 返回按钮的混入
export const backBtnMixin = {
    methods: {
        backClick() {
            this.$router.back()
        }
    }
}
// 收藏或购物车管理按钮混入
export const simpleManageMixin = {
    data() {
        return {
            isCheckbox: false,
        };
    },
    computed: {
        simpleManageStyle() {
            return this.isCheckbox ? {
                color: '#ffeb00',
                text: '完成'
            } : {
                color: '#fff',
                text: '管理'
            }
        }
    },
    methods: {
        simpleManage() {
            this.isCheckbox = !this.isCheckbox;
        },
    },
}
