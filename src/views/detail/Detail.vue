<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav" />
        <bscroll
            class="detail-scroll"
            ref="detailScroll"
            :probe-type="3"
            :mouse-wheel="true"
            :listen-scroll="true"
            @scroll="contScroll"
        >
            <bs-swiper class="detail-swiper" :banners="detailBanners" />
            <detail-base-info :baseInfo="baseInfo" />
            <detail-shop-info :shopInfo="shopInfo" />
            <detail-goods-info :goodsInfo="goodsInfo" @imgLoad="goodsImgLoad" />
            <detail-param-info :paramsInfo="paramsInfo"/>
        </bscroll>
    </div>
</template>

<script>
// 公用组件
import BsSwiper from '_com/common/bsswiper/BsSwiper';
import Bscroll from '_com/common/bscroll/Bscroll';

// 子组件
import DetailNavBar from './child-comps/DetailNavBar';
import DetailBaseInfo from './child-comps/DetailBaseInfo';
import DetailShopInfo from './child-comps/DetailShopInfo';
import DetailGoodsInfo from './child-comps/DetailGoodsInfo';
import DetailParamInfo from './child-comps/DetailParamInfo';

// 获取数据
import { getDetailGoods, GoodsInfo, ShopInfo, GoodsParam } from '_new/detail';

export default {
    name: 'Detail',
    components: {
        Bscroll,
        BsSwiper,
        DetailNavBar,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo
    },
    data() {
        return {
            goodsId: null,
            detailBanners: [],
            baseInfo: {},
            shopInfo: {},
            goodsInfo: {},
            paramsInfo: {}
        };
    },
    beforeCreate() {
        // 进入详情页前隐藏tabbar
        this.$store.commit('setTabBarShow', false);
    },
    created() {
        // 保存传入的id
        this.goodsId = this.$route.params.id;
        this.getDetailGoods();
    },
    // 路由离开的时候恢复tabBar
    beforeRouteLeave(to, from, next) {
        this.$store.commit('setTabBarShow', true);
        next();
    },
    mounted() {
        // 当顶部轮播图片加载一张后，执行better-scroll的refresh方法
        this.$bus.$on('swiperImgLoad', () => {
            this.$refs.detailScroll.refresh();
        });
    },
    destroyed() {
        // 销毁时取消detail组件事件总线的监听
        this.$bus.$off('swiperImgLoad');
    },
    methods: {
        getDetailGoods() {
            getDetailGoods(this.goodsId).then(res => {
                console.log(res);
                const data = res.result;
                // 获取轮播数据，并处理
                this.detailBanners = data.itemInfo.topImages.map(value => {
                    let json = {};
                    json.image = value;
                    return json;
                });

                // 获取商品信息数据
                this.baseInfo = new GoodsInfo(
                    data.itemInfo,
                    data.columns,
                    data.shopInfo.services
                );

                // 商品店铺信息
                this.shopInfo = new ShopInfo(data.shopInfo);

                // 获取商品详细信息
                this.goodsInfo = data.detailInfo;

                // 获取参数信息
                this.paramsInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
            });
        },
        goodsImgLoad() {
            // 接收图片加载完全后执行better-scroll的refresh方法
            this.$refs.detailScroll.refresh();
        },
        contScroll() {}
    }
};
</script>

<style scoped>
#detail {
    height: 100vh;
    background-color: #fff;
}
.detail-nav {
    background-color: #fff;
}
.detail-scroll {
    height: calc(100% - 44px);
}
.detail-swiper {
    height: 300px;
}
</style>
<style>
.base-info-msg {
  padding: 10px 15px;
  box-sizing: border-box;
  font-size: 16px;
  font-weight: normal;
}
.base-info-msg span {
    padding-left: 8px;
    border-left: 6px solid #5ea732;
}
</style>