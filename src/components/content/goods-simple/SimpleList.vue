<template>
    <div>
        <bscroll
            class="simple-scroll"
            :probe-type="3"
            :mouse-wheel="true"
            :bounce="false"
            :listen-scroll="true"
            @inScroll="contScroll"
            ref="scroll"
        >
            <simple-list-item
                v-for="item in simpleList"
                :key="item.id"
                :product="item"
                :simple-desc="simpleDesc"
                :is-checkbox="isCheckbox"
                :checked-color="checkedColor"
                :is-foot-btn="isFootBtn"
                :btn-text="btnText"
            />
            <div class="recommend-info">
                <msg-title title="你可能还喜欢" />
                <goods-list class="simple-goods" :goods-list="recommendInfo" />
                <p class="recommend-msg">没有更多了</p>
            </div>
        </bscroll>
        <back-top
            @click.native="backClick"
            class="simple-back-top"
            v-show="isBackTop"
        />
    </div>
</template>

<script>
import Bscroll from '_com/common/bscroll/Bscroll';
import MsgTitle from '_com/content/msg-title/MsgTitle';
import GoodsList from '_com/content/goods/GoodsList';
import SimpleListItem from './SimpleListItem';

// 导入混入
import { goodsListenerMixin, backTopMixin } from '_con/mixin';

export default {
    name: 'SimpleList',
    props: {
        // 是否显示复选按钮
        isCheckbox: {
            type: Boolean,
            default: true,
        },
        // 复选按钮的颜色
        checkedColor: {
            type: String,
            default: '#ff4500',
        },
        // 是否显示底部按钮
        isFootBtn: {
            type: Boolean,
            default: false,
        },
        // 按钮文字
        btnText: {
            type: String,
            default: '找相似',
        },
        // 列表数据
        simpleList: {
            type: Array,
            default() {
                return [];
            },
        },
        // 描述位置显示类型
        simpleDesc: {
            type: String,
            default: 'cartDesc',
        },
        // 推荐数据
        recommendInfo: {
            type: Array,
            default() {
                return [];
            },
        },
    },
    components: {
        Bscroll,
        MsgTitle,
        SimpleListItem,
        GoodsList,
    },
    mixins: [goodsListenerMixin, backTopMixin],

    // 刷新better-scroll，且必须用activated生命周期，才会同步新增购物车
    activated() {
        this.$refs.scroll.refresh();
    },
    destroyed() {
        // 取消detail组件事件总线的监听
        this.$bus.$off('itemImageLoad', this.goodstImgListener);
    },
    methods: {
        // 监听滚动位置的自定义事件，滚动到锚点，导航跟着改变
        contScroll(pos) {
            // 监听滚动位置
            this.curPosition = pos ? -pos.y : 0;
        },
    },
};
</script>

<style scoped>
.simple-scroll {
    height: 100%;
}
.recommend-info {
    margin-top: 20px;
}

.simple-goods {
    background: none;
}
.recommend-msg {
    font-size: 14px;
    line-height: 40px;
    text-align: center;
    color: #9e9a9a;
}
div.simple-back-top {
    bottom: 100px;
}
</style>