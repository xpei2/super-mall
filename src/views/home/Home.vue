<template>
    <div id="home">
        <nav-bar class="home-nav">
            <template v-slot:nav-center>购物车</template>
        </nav-bar>
        <tab-control
            v-show="isTabShow"
            :titles="titles"
            @tabClick="tabClick"
            class="home-tab-control"
            ref="tabControlFixed"
        />
        <bscroll
            class="bscroll-style"
            ref="scroll"
            :probe-type="3"
            :mouse-wheel="true"
            :pull-up="true"
            :listen-scroll="true"
            @scroll="contScroll"
            @scrollEnd="contScrollEnd"
        >
            <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad" />
            <recommend-view :recommends="recommend" />
            <feature-view />
            <tab-control
                class="home-tab-control"
                :titles="titles"
                @tabClick="tabClick"
                ref="tabControl"
            />
            <goods-list :goodsList="showGoods" />
        </bscroll>
        <back-top @click.native="backClick" v-show="isShowBackTop" />
    </div>
</template>

<script>
// 公共组件
import NavBar from '_com/common/navbar/NavBar';
import Bscroll from '_com/common/bscroll/Bscroll';
import TabControl from '_com/content/tab-control/TabControl';
import GoodsList from '_com/content/goods/GoodsList';
import BackTop from '_com/content/back-top/BackTop';

// 子组件
import HomeSwiper from './child-comps/HomeSwiper';
import RecommendView from './child-comps/RecommendView';
import FeatureView from './child-comps/FeatureView';

// 获取数据
import { getHomeMultidata, getHomeGoods } from '_new/home';

// 引入功能函数
import { debounce } from '_con/utils';

export default {
    name: 'Home',
    components: {
        NavBar,
        Bscroll,
        TabControl,
        GoodsList,
        BackTop,
        HomeSwiper,
        RecommendView,
        FeatureView
    },
    data() {
        return {
            banners: [],
            recommend: [],
            keywords: [],
            titles: ['流行', '精选', '新款'],
            goods: {
                pop: { page: 0, list: [] },
                new: { page: 0, list: [] },
                sell: { page: 0, list: [] }
            },
            currentType: 'pop',
            // 回到顶部按钮是否显示
            isShowBackTop: false,
            // tabCtrol的offsetTop
            tabOffsetTop: 0,
            // tabCtrolFixed是否显示
            isTabShow: false,
            // 保存better-scroll的滚动位置
            saveY: 0
        };
    },
    created() {
        // 1.请求多个数据
        this.getHomeMultidata();
        // 2.请求商品数据
        this.getHomeGoods('pop');
        this.getHomeGoods('new');
        this.getHomeGoods('sell');
    },
    mounted() {
        // 1.监听商品图片加载完成
        const refresh = debounce(this.$refs.scroll.refresh, 200);
        this.$bus.$on('itemImageLoad', () => {
            refresh();
        });
    },
    activated() {
        this.$refs.scroll.scrollTo(0, this.saveY, 0);
        this.$refs.scroll.refresh()
    },
    deactivated() {
        this.saveY = this.$refs.scroll.getScrollY();
    },
    computed: {
        showGoods() {
            return this.goods[this.currentType].list;
        }
    },
    methods: {
        /**
         * 事件监听相关方法
         */
        // 监听swiper的图片加载完成，并获取tabControl的offsetTop
        swiperImgLoad() {
            this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
        },
        // 监听tabCtrol的点击事件
        tabClick(index) {
            switch (index) {
                case 0:
                    this.currentType = 'pop';
                    break;
                case 1:
                    this.currentType = 'new';
                    break;
                case 2:
                    this.currentType = 'sell';
                    break;
            }
            this.$refs.tabControlFixed.currentIndex = index;
            this.$refs.tabControl.currentIndex = index;
        },

        // 监听跳转顶部的按钮
        backClick() {
            // 1. 利用监听组件的原生事件.native 然后取得bsBcroll组件的属性，就是scroll对象，
            // 2. 用scroll组件内部的封装的scrollTo方法，此处不是better-scroll的原生方法
            this.$refs.scroll.scrollTo(0, 0);
        },

        // 监听滚动位置的自定义事件
        contScroll(value) {
            // 判断BackTop是否显示
            this.isShowBackTop = value < -1000;

            // 判断tabControl是否吸顶
            this.isTabShow = -value > this.tabOffsetTop;
        },

        // 监听滚动结束的上拉加载事件
        contScrollEnd() {
            this.getHomeGoods(this.currentType);
        },

        /**
         * 网络请求的方法
         */
        getHomeMultidata() {
            getHomeMultidata().then(res => {
                this.banners = res.data.banner.list;
                this.recommend = res.data.recommend.list;
                this.keywords = res.data.keywords.list;
            });
        },
        getHomeGoods(type) {
            const page = this.goods[type].page + 1;
            getHomeGoods(type, page).then(res => {
                this.goods[type].list.push(...res.data.list);
                this.goods[type].page += 1;
            });
        }
    }
};
</script>

<style scoped>
#home {
    position: relative;
    height: 100vh;
}
.home-nav {
    position: relative;
    z-index: 9;
    width: 100%;
    background-color: var(--color-tint);
    color: #fff;
}
.home-tab-control {
    position: relative;
    z-index: 99;
    background-color: #fff;
}
.bscroll-style {
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 49px;
}
</style>