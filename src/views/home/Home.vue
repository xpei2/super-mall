<template>
    <div id="home">
        <nav-bar class="home-nav">
            <template v-slot:nav-center>购物车</template>
        </nav-bar>
        <bscroll class="bscroll-style">
            <home-swiper :banners="banners" />
            <recommend-view :recommends="recommend" />
            <feature-view />
            <tab-control class="home-tab-control" :titles="titles" @tabClick="tabClick" />
            <goods-list :goodsList="showGoods" />
        </bscroll>
    </div>
</template>

<script>
// 公共组件
import NavBar from '_com/common/navbar/NavBar';
import Bscroll from '_com/common/bscroll/Bscroll';
import TabControl from '_com/content/tab-control/TabControl';
import GoodsList from '_com/content/goods/GoodsList';

// 子组件
import HomeSwiper from './child-comps/HomeSwiper';
import RecommendView from './child-comps/RecommendView';
import FeatureView from './child-comps/FeatureView';

// 获取数据
import { getHomeMultidata, getHomeGoods } from '_new/home';

export default {
    name: 'Home',
    components: {
        NavBar,
        Bscroll,
        TabControl,
        GoodsList,
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
            currentType: 'pop'
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
    computed: {
        showGoods() {
            return this.goods[this.currentType].list;
        }
    },
    methods: {
        // 事件监听的方法
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
        },

        //网络请求的方法
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
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
    width: 100%;
    background-color: var(--color-tint);
    color: #fff;
}
.home-tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
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