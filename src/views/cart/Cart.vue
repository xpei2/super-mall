<template>
    <div id="cart">
        <!-- 导航 -->
        <nav-bar :class="{ 'cart-empty-nav': cartEmpty }">
            <template v-slot:nav-left v-if="cartEmpty">
                <strong> 购物车({{ cartCount }}) </strong>
                <div class="cart-empty-img"><img src="~_ats/img/cart/cart-empty.jpg" alt=""></div>
            </template>
            <template v-slot:nav-center v-else
                >购物车({{ cartCount }})</template
            >
            <template v-slot:nav-right>
                <span
                    v-if="!cartEmpty"
                    @click="simpleManage"
                    :style="{ color: simpleManageStyle.color }"
                    >{{ simpleManageStyle.text }}</span
                >
            </template>
        </nav-bar>
        <simple-empty
            v-if="cartEmpty"
            empty-title="购物车竟然是空的"
            empty-msg="再忙，也要记得买点什么犒劳自己吧~"
        />
        <div v-else class="cart-container">
            <!-- 购物车列表 -->
            <simple-list
                class="cart-list"
                checked-color="#ff4500"
                :simple-list="cartList"
            />
            <!-- 底部汇总 -->
            <cart-bottom-bar
                checked-color="#ff4500"
                :checked-all="checkedAll"
            />
        </div>
    </div>
</template>

<script>
// 公共组件
import NavBar from '_com/common/navbar/NavBar';
import { SimpleEmpty, SimpleList } from '_com/content/goods-simple/index';

// 子组件
import CartBottomBar from './children/CartBottomBar';

// 导入Vuex
import { mapGetters, mapMutations } from 'vuex';

// 导入混入
import { simpleManageMixin } from '_con/mixin';
export default {
    name: 'Cart',
    components: {
        NavBar,
        SimpleEmpty,
        SimpleList,
        CartBottomBar,
    },
    computed: {
        ...mapGetters(['cartCount', 'cartList']),
        checkedAll() {
            return this.cartList.length === 0
                ? false
                : !this.cartList.find((item) => !item.checked);
        },
        // 判断购物车是否为空，是则显示提示内容，否则显示购物车内容
        cartEmpty() {
            return this.cartCount === 0;
        },
    },
    mixins: [simpleManageMixin],
    methods: {
        ...mapMutations(['setLocalCart']),
    },
    created() {
        // 每次刷新页面获取本地存储购物车数据
        let cart = JSON.parse(localStorage.getItem('cartList'));
        if (cart) {
            this.setLocalCart(cart);
        }
    },
};
</script>

<style scoped>
#cart {
    height: calc(100vh - 49px);
}
.cart-empty-nav {
    height: 160px;
}
.cart-empty-nav >>> .nav-left {
    width: 100%;
    display: block;
    padding: 10px;
}
.cart-empty-nav >>> .cart-empty-img {
    margin-top: 25px;
    height: 80px;
    overflow: hidden;
}
.cart-empty-nav >>> .cart-empty-img img {
    display: block;
    width: 100%;
}
.cart-empty-nav >>> .nav-left strong {
    font-size: 1.2em;
}
.cart-empty-nav >>> .nav-center,
.cart-empty-nav >>> .nav-right {
    display: none;
}
.cart-container {
    height: calc(100% - 44px);
}
.cart-list {
    height: calc(100% - 50px);
}
</style>
