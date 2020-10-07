<template>
    <van-goods-action class="detail-bottom-bar">
        <van-goods-action-icon
            icon="chat-o"
            text="客服"
            dot
            color="#07c160"
            @click="serviceClick"
        />
        <van-goods-action-icon
            icon="cart-o"
            text="购物车"
            :badge="cartCount"
            @click="shopClick"
        />
        <van-goods-action-icon
            :icon="collectIs.icon"
            :text="collectIs.text"
            :color="collectIs.color"
            @click="collectClick"
        />
        <van-goods-action-button
            type="warning"
            text="加入购物车"
            @click="addToCart"
        />
        <van-goods-action-button
            type="danger"
            text="立即购买"
            @click="buyClick"
        />
        <!-- <sport-ball ref="ball" class="sport-ball" /> -->
    </van-goods-action>
</template>

<script>
import { GoodsAction, GoodsActionIcon, GoodsActionButton } from 'vant';
export default {
    name: 'DetailBottomBar',
    props: {
        goodsId: String
    },
    data() {
        return {
            isCollect: false
        };
    },
    components: {
        [GoodsAction.name]: GoodsAction,
        [GoodsActionIcon.name]: GoodsActionIcon,
        [GoodsActionButton.name]: GoodsActionButton
    },
    created() {
        // localStorage.clear()
        // 每次刷新页面获取本地存储购物车数据
        let cart = JSON.parse(localStorage.getItem('cartList'));
        if (cart) {
            this.$store.commit('setLocalCart', cart);
        }

        // 获取收藏列表缓存，并查找缓存中当前商品是否被收藏
        let collectData = JSON.parse(localStorage.getItem('collectList'));
        if (collectData) {
            this.$store.commit('setLocalCollect', collectData);
            //这里需要判断缓存中是否存在当前商品，若存在则按钮显示为true，用到了传过来的id
            this.isCollect = collectData.find(item => item.id === this.goodsId);
        }
    },
    methods: {
        serviceClick() {
            this.$toast('暂无客服');
        },
        shopClick() {
            this.$router.push('/cart');
        },
        collectClick() {
            //点击按钮的样式变化
            this.isCollect = !this.isCollect;
            // 提交收藏点击事件
            this.$emit('collectClick');
        },
        addToCart() {
            // 提交购物车点击事件
            this.$emit('addToCart');
        },
        buyClick() {
            this.$router.push('/cart');
        }
    },
    computed: {
        collectIs() {
            return this.isCollect
                ? { text: '已收藏', color: '#ff5000', icon: 'star' }
                : { text: '收藏', color: '', icon: 'star-o' };
        },
        cartCount() {
            return this.$store.getters.cartCount !== 0
                ? this.$store.getters.cartCount
                : '';
        }
    }
};
</script>

<style scoped>
.detail-bottom-bar {
    border-top: 1px solid #e6e6e6;
    box-shadow: 0 -1px 1px #efefef;
}
/deep/ .van-info {
    top: 2px;
}
</style>