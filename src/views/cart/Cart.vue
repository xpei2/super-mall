<template>
    <div id="cart">
        <!-- 导航 -->
        <nav-bar class="cart-nav" :class="{'cart-empty-nav' : cartRmpty}">
            <template v-slot:nav-center>购物车({{ cartCount }})</template>
        </nav-bar>
        <div v-if="cartRmpty" class="cart-empty">
            <img margintop src="~_ats/img/cart/cart-empty.png" alt="">
            <h3 margintop>购物车竟然是空的</h3>
            <p margintop>再忙，也要记得买点什么犒劳自己吧~</p>
            <van-button margintop type="primary" plain color="var(--color-text)" to="home">去逛逛</van-button>
        </div>
        <div v-else class="cart-container">
            <!-- 购物车列表 -->
            <cart-list :checked-color="checkedColor" :cart-list="cartList" />
            <!-- 底部汇总 -->
            <cart-bottom-bar
                :checked-color="checkedColor"
                :checked-all="checkedAll"
            />
        </div>
    </div>
</template>

<script>
// 公共组件
import NavBar from '_com/common/navbar/NavBar';

// 子组件
import CartList from './children/CartList';
import CartBottomBar from './children/CartBottomBar';

import { Button } from 'vant';
import { mapGetters, mapMutations } from 'vuex';

export default {
    name: 'Cart',
    components: {
        NavBar,
        CartList,
        CartBottomBar,
        [Button.name]: Button
    },
    data() {
        return {
            checkedColor: '#ff4500'
        };
    },
    computed: {
        ...mapGetters(['cartCount', 'cartList']),
        checkedAll() {
            return this.cartList.length === 0
                ? false
                : !this.cartList.find(item => !item.checked);
        },
        // 判断购物车是否为空，是则显示提示内容，否则显示购物车内容
        cartRmpty() {
            return this.cartCount === 0;
        }
    },
    methods: {
        ...mapMutations(['setLocalCart'])
    },
    created() {
        // localStorage.clear();
        // 每次刷新页面获取本地存储购物车数据
        let cart = JSON.parse(localStorage.getItem('cartList'));
        if (cart) {
            this.setLocalCart(cart);
        }
    }
};
</script>

<style scoped>
#cart {
    height: calc(100vh - 49px);
}
.cart-nav {
    width: 100%;
    background-color: var(--color-tint);
    color: #fff;
}
.cart-empty-nav {
    height: 160px;
}
.cart-empty {
    display: flex;
    align-items: center;
    flex-direction: column;
    height: calc(100% - 220px);
    text-align: center;
}
.cart-empty [margintop] {
    margin-top: 20px;
}
.cart-empty img {
   width: 110px;
}
.cart-empty> h3 {
    font-size: 20px;
    font-weight: normal;
}
.cart-empty> p {
    font-size: 14px;
    color: var(--color-text);
}
.cart-container {
    height: calc(100% - 44px);
}
</style>
