<template>
    <div id="detail">
        <detail-nav-bar
            @titleClick="titleClick"
            ref="detailNavbar"
        />
        <bscroll
            class="detail-scroll"
            ref="scroll"
            :probe-type="3"
            :mouse-wheel="true"
            :pull-up="true"
            :listen-scroll="true"
            @inScroll="contScroll"
        >
            <bs-swiper
                class="detail-swiper set-scroll"
                :banners="detailBanners"
            />
            <detail-base-info :base-info="baseInfo" />
            <detail-shop-info :shop-info="shopInfo" />
            <detail-goods-info
                :goods-info="goodsInfo"
                @imgLoad="goodsImgLoad"
            />
            <detail-param-info
                ref="setParams"
                class="set-scroll"
                :params-info="paramsInfo"
            />
            <detail-rate-info
                ref="setRate"
                class="set-scroll"
                :rate-info="rateInfo"
            />
            <goods-list
                ref="setRecommend"
                class="detail-goods set-scroll"
                :goods-list="recommendInfo"
            />
            <p class="detail-msg">没有更多了</p>
        </bscroll>
        <back-top @click.native="backClick" v-show="isBackTop" />
        <detail-bottom-bar
            @addToCart="addToCart"
            @collectClick="collectClick"
            :goods-id="goodsId"
        />
    </div>
</template>

<script>
// 公用组件
import BsSwiper from '_com/common/bsswiper/BsSwiper';
import Bscroll from '_com/common/bscroll/Bscroll';
import GoodsList from '_com/content/goods/GoodsList';

// 子组件
import DetailNavBar from './children/DetailNavBar';
import DetailBaseInfo from './children/DetailBaseInfo';
import DetailShopInfo from './children/DetailShopInfo';
import DetailGoodsInfo from './children/DetailGoodsInfo';
import DetailParamInfo from './children/DetailParamInfo';
import DetailRateInfo from './children/DetailRateInfo';
import DetailBottomBar from './children/DetailBottomBar';

// 获取数据
import {
    getDetailGoods,
    getRecommend,
    BaseInfo,
    ShopInfo,
    ParamInfo,
} from '_new/detail';

// 导入混入
import {
    goodsListenerMixin,
    swiperListenerMixin,
    backTopMixin,
} from '_con/mixin';

// 导入Vuex
import { mapActions } from 'vuex';

export default {
    name: 'Detail',
    components: {
        Bscroll,
        BsSwiper,
        GoodsList,
        DetailNavBar,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailRateInfo,
        DetailBottomBar,
    },
    data() {
        return {
            goodsId: null,
            detailBanners: [],
            baseInfo: {},
            shopInfo: {},
            goodsInfo: {},
            paramsInfo: {},
            rateInfo: {},
            recommendInfo: [],
            setScrollTop: [],
            navIndex: 0,
        };
    },
    mixins: [goodsListenerMixin, swiperListenerMixin, backTopMixin],
    beforeCreate() {
        // 进入详情页前隐藏tabbar
        this.$store.commit('setTabBarShow', false);
    },
    created() {
        // 保存传入的id
        this.goodsId = this.$route.params.id;

        // 请求详情数据
        this.getDetailGoods();

        // 请求推荐数据
        this.getRecommend();
    },
    beforeMount() {
        // 定义swiper监听执行的函数
        this.swiperImgListener = () => this.$refs.scroll.refresh();
    },
    beforeRouteLeave(to, from, next) {
        // 路由离开的时候恢复tabBar
        this.$store.commit('setTabBarShow', true);
        next();
    },
    destroyed() {
        // 销毁时取消swiper组件事件总线的监听
        this.$bus.$off('swiperImgLoad', this.swiperImgListener);

        // 取消detail组件事件总线的监听
        this.$bus.$off('itemImageLoad', this.goodstImgListener);
    },

    methods: {
        ...mapActions(['setCartGoods', 'setCollectGoods']),
        // 接收图片加载完全后执行better-scroll的refresh方法
        goodsImgLoad() {
            this.$refs.scroll.refresh();
            this.getScrollTop();
        },

        // 获取锚点距离顶部的位置
        getScrollTop() {
            // 获取锚点举例顶部的距离
            this.setScrollTop = []; //每次获取之前将上次获取的清空
            Array.from(document.querySelectorAll('.set-scroll')).forEach(
                (el) => {
                    this.setScrollTop.push(el.offsetTop);
                }
            );
            // 给获取到的位置数组添加一个最大值，便于两个值之间的判断
            this.setScrollTop.push(Number.MAX_VALUE);
        },

        // 顶部导航点击事件
        titleClick(index) {
            // scrollTo方法
            this.$refs.scroll.scrollTo(0, -this.setScrollTop[index], 200);

            // scrollToElement方法
            // this.$nextTick(() => {
            //     let el = document.querySelectorAll('.set-scroll');
            //     this.$refs.scroll.scrollToElement(el[index], 200);
            // });
        },

        // 监听滚动位置的自定义事件，滚动到锚点，导航跟着改变
        contScroll(pos) {
            // 监听滚动位置
            this.curPosition = pos ? -pos.y : 0;
            // 1.普通做法，三个判断
            // let topLength = this.setScrollTop.length;
            // a. this.navIndex !== i
            // b. i < topLength - 1
            // a. i === topLength - 1
            // for (let i of this.setScrollTop.keys()) {
            //     if (
            //         (i < topLength - 1 &&
            //             this.curPosition >= this.setScrollTop[i] &&
            //             this.curPosition < this.setScrollTop[i + 1]) ||
            //         (i === topLength - 1 &&
            //             this.curPosition >= this.setScrollTop[i])
            //     ) {
            //         if (this.navIndex !== i) {
            //             this.navIndex = i;
            //             this.$refs.detailNavbar.currentIndex = i;
            //         }
            //     }
            // }

            // 2.hack做法，给setScrollTop数组添加一个最大值，则不需要判断是否小于或者等于topLength - 1
            for (let i of this.setScrollTop.keys()) {
                if (
                    this.navIndex !== i &&
                    this.curPosition >= this.setScrollTop[i] &&
                    this.curPosition < this.setScrollTop[i + 1]
                ) {
                    this.navIndex = i;
                    this.$refs.detailNavbar.currentIndex = i;
                }
            }
        },

        // 监听购物车列表事件，并提交到状态管理处理
        addToCart() {
            // 获取当前购物车商品的数据
            const cartGoods = {
                image: this.detailBanners[0].image,
                title: this.baseInfo.title,
                desc: this.baseInfo.desc,
                price: this.baseInfo.realPrice,
                id: this.goodsId,
            };
            // 引用Vuex的actions里面的方法
            this.setCartGoods(cartGoods)
                .then((res) => {
                    this.$toast({
                        type: res.type,
                        position: res.position,
                        message: res.message,
                        // 弹框的时候禁止点击
                        forbidClick: true,
                        duration: 1500,
                    });
                })
                .catch((err) => err);
        },

        // 监听收藏列表事件，并提交到状态管理处理
        collectClick() {
            // 获取商品被收藏的数量
            let collectCount = parseInt(
                this.baseInfo.columns[1].match(/\d+/)[0]
            );
            // 获取当前收藏商品数据
            const collectGoods = {
                id: this.goodsId,
                image: this.detailBanners[0].image,
                desc: this.baseInfo.desc,
                price: this.baseInfo.realPrice,
                title: this.baseInfo.title,
                collect:
                    collectCount >= 10000
                        ? `${Math.floor(collectCount / 10000)}万+人收藏`
                        : collectCount >= 1000 && collectCount < 10000
                        ? `${Math.floor(collectCount / 1000)}000+人收藏`
                        : `${collectCount}人收藏`,
            };
            // 引用Vuex的actions里面的方法
            this.setCollectGoods(collectGoods)
                .then((res) => {
                    this.$toast({
                        type: 'success',
                        icon: res.icon,
                        message: res.message,
                        // 弹框的时候禁止点击
                        forbidClick: true,
                        duration: 1500,
                    });
                })
                .catch((err) => err);
        },
        // 请求详情数据
        getDetailGoods() {
            getDetailGoods(this.goodsId).then((res) => {
                const data = res.result;
                // 获取轮播数据，并处理
                this.detailBanners = data.itemInfo.topImages.map((value) => {
                    let json = {};
                    json.image = value;
                    return json;
                });

                // 获取商品信息数据
                this.baseInfo = new BaseInfo(
                    data.itemInfo,
                    data.columns,
                    data.shopInfo.services
                );

                // 商品店铺信息
                this.shopInfo = new ShopInfo(data.shopInfo);

                // 获取商品详细信息
                this.goodsInfo = data.detailInfo;

                // 获取参数信息
                this.paramsInfo = new ParamInfo(
                    data.itemParams.info,
                    data.itemParams.rule
                );
                // 获取评论信息，注：店家回复没有做
                this.rateInfo = data.rate.cRate === 0 ? {} : data.rate.list[0];
            });
        },

        // 获取推荐数据
        getRecommend() {
            getRecommend().then((res) => {
                this.recommendInfo = res.data.list;
            });
        },
    },
};
</script>

<style scoped>
#detail {
    height: 100vh;
    background-color: #fff;
}
.detail-scroll {
    height: calc(100% - 93px);
}
.detail-swiper {
    height: 300px;
}
.detail-goods {
    background: none;
}

.detail-msg {
    font-size: 14px;
    line-height: 40px;
    text-align: center;
    color: #9e9a9a;
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