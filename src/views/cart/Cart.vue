<template>
    <div id="cart">
        <!-- 导航 -->
        <nav-bar :class="{ 'cart-empty-nav': cartEmpty }">
            <template v-slot:nav-left v-if="cartEmpty">
                <strong> 购物车({{ cartCount }}) </strong>
                <div class="cart-empty-img">
                    <img src="~_ats/img/cart/cart-empty.jpg" alt="" />
                </div>
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
                :recommend-info="recommendInfo"
            />
            <!-- 底部汇总 -->
            <simple-bottom-bar
                class="cart-submit-bar"
                checked-color="#ff4500"
                :is-checkbox="isCheckbox"
                :checked-all="checkedAll"
            >
                <template v-slot:manage-btn>
                    <button class="cart-clear-btn" @click="clearCart">
                        <img src="~_ats/img/common/clear.png" alt="" />清理
                    </button>
                    <button @click="addCollect">加入收藏夹</button>
                    <button @click="removeCart">删除</button>
                </template>
            </simple-bottom-bar>
        </div>
    </div>
</template>

<script>
// 公共组件
import NavBar from '_com/common/navbar/NavBar';
import {
    SimpleEmpty,
    SimpleList,
    SimpleBottomBar,
} from '_com/content/goods-simple/index';

// 子组件
// import CartBottomBar from './children/CartBottomBar';

// 获取推荐数据
import { getRecommend } from '_new/recommend';

// 导入Vuex
import { mapGetters, mapMutations } from 'vuex';

// 导入混入
import { simpleManageMixin } from '_con/mixin';
export default {
    name: 'Cart',
    data() {
        return {
            recommendInfo: [],
        };
    },
    components: {
        NavBar,
        SimpleEmpty,
        SimpleList,
        SimpleBottomBar,
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
        // 清理购物车
        clearCart() {
            this.$toast({
                type: 'fail',
                message: '暂未开通\n此功能',
                // 弹框的时候禁止点击
                forbidClick: true,
                duration: 1500,
            });
        },
        // 添加收藏夹
        addCollect() {
            this.$toast({
                type: 'fail',
                message: '暂未开通\n此功能',
                // 弹框的时候禁止点击
                forbidClick: true,
                duration: 1500,
            });
        },
        // 删除购物车
        removeCart() {
            this.$toast({
                type: 'fail',
                message: '暂未开通\n此功能',
                // 弹框的时候禁止点击
                forbidClick: true,
                duration: 1500,
            });
        },
        // 获取推荐数据
        getRecommend() {
            getRecommend().then((res) => {
                this.recommendInfo = res.data.list;
            });
        },
    },
    created() {
        // 每次刷新页面获取本地存储购物车数据
        let cart = JSON.parse(localStorage.getItem('cartList'));
        if (cart) {
            this.setLocalCart(cart);
        }
        // 获取推荐数据
        this.getRecommend();
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
.cart-submit-bar {
    bottom: 49px;
}
.cart-container .cart-clear-btn {
    display: flex;
    align-items: center;
    margin-right: -5px;
    border: 0;
    color: inherit;
}
.cart-container .cart-clear-btn:active {
    background: none;
}
.cart-clear-btn img {
    width: 11px;
    margin-right: 4px;
}
</style>
