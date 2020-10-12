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
                :is-checkbox="isCheckbox"
                btn-text="找相似"
                is-foot-btn
            />
            <!-- 底部汇总 -->
            <collect-bottom-bar v-show="isShowBottom" checked-color="#ff4500" />
        </div>
    </div>
</template>


<script>
// 公共组件
import NavBar from '_com/common/navbar/NavBar';
import { SimpleEmpty, SimpleList } from '_com/content/goods-simple/index';
import { Icon } from 'vant';
// 子组件
import CollectBottomBar from './children/CollectBottomBar';

// 获取推荐数据
import { getRecommend } from '_new/recommend';

// 状态管理
import { mapGetters, mapMutations } from 'vuex';

// 导入混入
import { simpleManageMixin, backBtnMixin } from '_con/mixin';
export default {
    name: 'Collect',
    data() {
        return {
            recommendInfo: []
        };
    },
    components: {
        NavBar,
        SimpleEmpty,
        SimpleList,
        [Icon.name]: Icon,
        CollectBottomBar,
    },
    mixins: [simpleManageMixin, backBtnMixin],
    computed: {
        // 获取状态管理的收藏列表数据
        ...mapGetters(['collectList', 'collectCount']),

        // 判断收藏是否为空，是则显示提示内容，否则显示收藏内容
        collectEmpty() {
            return this.collectCount === 0;
        },

        // 判断是否显示底部汇总
        isShowBottom() {
            return this.isCheckbox
        }
    },
    methods: {
        // 获取状态管理的设置收藏缓存方法
        ...mapMutations(['setLocalCollect']),
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
</style>