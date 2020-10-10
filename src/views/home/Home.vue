<template>
    <div id="home">
        <nav-bar>
            <template v-slot:nav-center>首页</template>
        </nav-bar>
        <tab-control
            v-show="isTabShow"
            :titles="titles"
            @tabClick="tabClick"
            class="home-tab-control"
            ref="tabControlFixed"
        />
        <bscroll
            class="home-scroll"
            ref="scroll"
            :probe-type="3"
            :mouse-wheel="true"
            :pull-up="true"
            :listen-scroll="true"
            @inScroll="contScroll"
            @scrollEnd="contScrollEnd"
        >
            <bs-swiper :banners="homeBanners" />
            <recommend-view :recommends="recommend" />
            <feature-view />
            <tab-control
                class="home-tab-control"
                :titles="titles"
                @tabClick="tabClick"
                ref="tabControl"
            />
            <goods-list :goods-list="goods[curType].list" />
        </bscroll>
        <back-top @click.native="backClick" v-show="isBackTop" />
    </div>
</template>

<script>
// 公共组件
import NavBar from '_com/common/navbar/NavBar';
import Bscroll from '_com/common/bscroll/Bscroll';
import BsSwiper from '_com/common/bsswiper/BsSwiper';
import TabControl from '_com/content/tab-control/TabControl';
import GoodsList from '_com/content/goods/GoodsList';

// 子组件
import RecommendView from './children/RecommendView';
import FeatureView from './children/FeatureView';

// 获取数据
import { getHomeMultidata, getHomeGoods } from '_new/home';

// 导入混入
import {
    goodsListenerMixin,
    swiperListenerMixin,
    backTopMixin
} from '_con/mixin';

export default {
    name: 'Home',
    components: {
        NavBar,
        Bscroll,
        BsSwiper,
        TabControl,
        GoodsList,
        RecommendView,
        FeatureView
    },
    data() {
        return {
            // 首页轮播数据
            homeBanners: [],
            recommend: [],
            keywords: [],
            titles: ['流行', '精选', '新款'],
            goods: {
                pop: { page: 0, list: [] },
                new: { page: 0, list: [] },
                sell: { page: 0, list: [] }
            },
            curType: 'pop',
            tabOffsetTop: 0
        };
    },
    mixins: [goodsListenerMixin, swiperListenerMixin, backTopMixin],
    created() {
        // 1.请求首页基本数据
        this.getHomeMultidata();
        // 2.请求商品数据
        this.getHomeGoods('pop');
        this.getHomeGoods('new');
        this.getHomeGoods('sell');
    },
    beforeMount() {
        // 定义swiper监听获取tabControl距离顶部距离的函数
        this.swiperImgListener = () => {
            this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
        };
    },

    activated() {
        this.$refs.scroll.refresh();
    },
    deactivated() {
        // 取消swiper组件事件总线的监听
        this.$bus.$off('swiperImgLoad', this.swiperImgListener);

        // 取消itemImage事件总线的监听
        this.$bus.$off('itemImageLoad', this.goodstImgListener);
    },
    computed: {
        isTabShow() {
            // 顶部导航是否显示
            return this.curPosition > this.tabOffsetTop;
        }
    },
    methods: {
        // 监听滚动位置的自定义事件
        contScroll(position) {
            // 获取滚动位置
            this.curPosition = position ? -position.y : 0;
        },

        // 监听tabCtrol的点击事件
        tabClick(index) {
            switch (index) {
                case 0:
                    this.curType = 'pop';
                    break;
                case 1:
                    this.curType = 'new';
                    break;
                case 2:
                    this.curType = 'sell';
                    break;
            }
            this.$refs.tabControlFixed.curIndex = index;
            this.$refs.tabControl.curIndex = index;
            // 解决每次一个类型加载过多数据点击另一个出现空白问题
            this.$refs.scroll.scrollTo(0, -this.tabOffsetTop, 50)
        },

        // 监听滚动结束的上拉加载事件
        contScrollEnd() {
            this.getHomeGoods(this.curType);
        },

        // 获取首页基本信息数据
        getHomeMultidata() {
            getHomeMultidata().then(res => {
                this.homeBanners = res.data.banner.list;
                this.recommend = res.data.recommend.list;
                this.keywords = res.data.keywords.list;
            });
        },

        // 获取首页商品列表数据
        getHomeGoods(type) {
            const page = this.goods[type].page + 1;
            getHomeGoods(type, page).then(res => {
                this.goods[type].list.push(...res.data.list);
                this.goods[type].page += 1;
            });
        }
        // 保存页面的滑动位置到缓存中
        // setSessionStorage() {
        //     // 在页面加载时读取sessionStorage
        //     if (sessionStorage.getItem('homePosition')) {
        //         this.setTop = parseFloat(
        //             sessionStorage.getItem('homePosition')
        //         );
        //     }
        //     // 在页面刷新时将滑动位置保存到sessionStorage里
        //     window.addEventListener('beforeunload', () => {
        //         sessionStorage.setItem('homePosition', -this.curPosition);
        //     });
        // }
    }
};
</script>

<style scoped>
#home {
    position: relative;
    height: calc(100vh - 49px);
}

.home-tab-control {
    position: relative;
    z-index: 99;
}
.home-scroll {
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 0;
}
</style>