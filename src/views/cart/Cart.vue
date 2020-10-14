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
                simple-desc="cartDesc"
            />
            <!-- 底部汇总 -->
            <simple-bottom-bar
                class="cart-submit-bar"
                checked-color="#ff4500"
                :is-checkbox="isCheckbox"
                :checked-all="checkedAll"
                :checked-goods="cartCheckedGoods"
                @checkedAllClick="checkedAllClick"
            >
                <template v-slot:manage-btn>
                    <button class="cart-clear-btn" @click="clearCartClick">
                        <img src="~_ats/img/common/clear.png" alt="" />清理
                    </button>
                    <button @click="addCollectClick">加入收藏夹</button>
                    <button @click="removeCartClick">删除</button>
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
import { Dialog } from 'vant';

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
        [Dialog.Component.name]: Dialog.Component,
    },
    computed: {
        ...mapGetters(['cartCount', 'cartList', 'collectList']),
        // 判断是否全部选中
        checkedAll() {
            return this.cartCount === 0
                ? false
                : !this.cartList.find((item) => !item.checked);
        },
        // 判断购物车是否为空，是则显示提示内容，否则显示购物车内容
        cartEmpty() {
            return this.cartCount === 0;
        },
        // 购物车选中的商品
        cartCheckedGoods() {
            return this.cartList.filter((item) => item.checked);
        },
    },
    mixins: [simpleManageMixin],
    methods: {
        ...mapMutations([
            'setLocalCart',
            'clearCart',
            'removeCart',
            'addCollect',
        ]),
        //全选按钮点击时将所有购物车商品的checked设置为全选按钮相反的状态
        checkedAllClick(bol) {
            this.cartList.forEach((item) => (item.checked = bol));
        },
        // 清理购物车
        clearCartClick() {
            Dialog.confirm({
                title: '购物车',
                message: '是否确认清理购物车！',
            }).then(() => {
                this.clearCart();
                this.$toast('购物车清理成功！');
            });
        },
        // 添加收藏夹
        addCollectClick() {
            let toastText = '';
            if (this.cartCheckedGoods.length === 0) {
                toastText = '你还未选中宝贝哦!';
            } else {
                this.cartCheckedGoods.forEach((cartItem) => {
                    if (
                        !this.collectList.find(
                            (item) => item.id === cartItem.id
                        )
                    ) {
                        delete cartItem.count;
                        this.addCollect(cartItem);
                    }
                });
                this.checkedAllClick(false);
                toastText = '已添加收藏夹！';
            }
            this.$toast(toastText);
        },
        // 删除购物车
        removeCartClick() {
            let toastText = '';
            if (this.cartCheckedGoods.length === 0) {
                toastText = '你还未选中宝贝哦!';
            } else {
                Dialog.confirm({
                    title: '购物车',
                    message: '是否确认删除选中商品！',
                }).then(() => {
                    this.removeCart();
                    toastText = '宝贝删除成功！';
                });
            }
            this.$toast(toastText);
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
