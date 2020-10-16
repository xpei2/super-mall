<template>
    <div id="collect">
        <!-- 导航 -->
        <nav-bar>
            <template v-slot:nav-left>
                <van-icon @click="backClick" name="arrow-left" />
            </template>
            <template v-slot:nav-center>我的收藏</template>
            <template v-slot:nav-right>
                <span
                    v-if="!collectEmpty"
                    class="simple-manage-btn"
                    @click="simpleManage"
                    :style="{ color: simpleManageStyle.color }"
                    >{{ simpleManageStyle.text }}</span
                >
            </template>
        </nav-bar>
        <simple-empty
            v-if="collectEmpty"
            empty-title="暂无收藏！"
            empty-msg="您还没有收藏宝贝哦，去逛逛吧~"
        />
        <div v-else class="collect-container">
            <!-- 收藏列表 -->
            <simple-list
                class="collect-list"
                checked-color="#ff4500"
                :simple-list="collectList"
                :recommend-info="recommendInfo"
                simple-desc="collectDesc"
                :is-checkbox="isCheckbox"
                btn-text="找相似"
                is-foot-btn
            />
            <!-- 底部汇总 -->
            <simple-bottom-bar
                class="collect-submit-bar"
                v-show="isCheckbox"
                checked-color="#ff4500"
                :is-price="false"
                :is-checkbox="isCheckbox"
                :checked-all="checkedAll"
                :checked-goods="collectCheckedGoods"
                @checkedAllClick="checkedAllClick"
            >
                <template v-slot:manage-btn>
                    <button @click="collectMoreClick">收藏更多</button>
                    <button @click="addCartClick">加入购物车</button>
                    <van-icon
                        name="delete"
                        class="collect-remove"
                        @click="removeCollectClick"
                    />
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
import { Icon, Dialog } from 'vant';

// 获取推荐数据
import { getRecommend } from '_new/recommend';

// 状态管理
import { mapGetters, mapActions, mapMutations } from 'vuex';

// 导入混入
import { simpleManageMixin, backBtnMixin } from '_con/mixin';
export default {
    name: 'Collect',
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
        [Icon.name]: Icon,
        [Dialog.Component.name]: Dialog.Component,
    },
    mixins: [simpleManageMixin, backBtnMixin],
    computed: {
        // 获取状态管理的收藏列表数据
        ...mapGetters(['collectList', 'collectCount', 'cartList']),
        // 判断是否全部选中
        checkedAll() {
            return this.collectCounth === 0
                ? false
                : !this.collectList.find((item) => !item.checked);
        },
        // 判断收藏是否为空，是则显示提示内容，否则显示收藏内容
        collectEmpty() {
            return this.collectCount === 0;
        },
        // 收藏选中的商品
        collectCheckedGoods() {
            return this.collectList.filter((item) => item.checked);
        },
    },
    methods: {
        // 获取状态管理的设置收藏缓存方法
        ...mapMutations(['setLocalCollect', 'removeCollect', 'addCart']),
        //全选按钮点击时将所有购物车商品的cartChecked设置为全选按钮相反的状态
        checkedAllClick(bol) {
            this.collectList.forEach((item) => (item.checked = bol));
        },
        // 收藏更多按钮
        collectMoreClick() {
            this.$router.push('/category');
        },
        // 添加购物车
        addCartClick() {
            if (this.collectCheckedGoods.length === 0) {
                this.$toast('你还未选中宝贝哦！');
            } else {
                // vant的弹出提示
                Dialog.confirm({
                    title: '购物车',
                    message: '是否确认将选中商品添加购物车！',
                }).then(() => {
                    this.collectCheckedGoods.forEach((collectItem) => {
                        if (
                            !this.cartList.find(
                                (item) => item.id === collectItem.id
                            )
                        ) {
                            this.addCart(collectItem);
                        }
                    });
                    this.checkedAllClick(false);
                    this.$toast('已经添加至购物车');
                });
            }
        },
        // 删除收藏
        removeCollectClick() {
            if (this.collectCheckedGoods.length === 0) {
                this.$toast('你还未选中宝贝哦！');
            } else {
                // vant的弹出提示
                Dialog.confirm({
                    title: '购物车',
                    message: '是否确认删除选中商品！',
                }).then(() => {
                    this.removeCollect();
                    this.$toast('宝贝删除成功！');
                });
            }
        },
        // 获取推荐列表数据
        getRecommend() {
            getRecommend().then((res) => {
                this.recommendInfo = res.data.list;
            });
        },
    },
    beforeCreate() {
        // 进入详情页前隐藏tabbar
        this.$store.commit('setTabBarShow', false);
    },
    created() {
        // 每次刷新页面获取本地存储购物车数据
        let collect = JSON.parse(localStorage.getItem('collectList'));
        if (collect) {
            this.setLocalCollect(collect);
        }
        // 获取推荐数据
        this.getRecommend();
    },
    beforeRouteLeave(to, from, next) {
        // 路由离开的时候恢复tabBar
        this.$store.commit('setTabBarShow', true);
        next();
    },
};
</script>

<style scoped>
#collect {
    height: 100vh;
}
.collect-container {
    height: calc(100% - 44px);
}
.collect-list {
    height: 100%;
}
.van-icon {
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    font-size: 22px;
}
.collect-remove {
    width: auto;
    height: auto;
    margin-left: 10px;
}
.van-icon-delete::before {
    transform: scaleX(0.8);
}
</style>