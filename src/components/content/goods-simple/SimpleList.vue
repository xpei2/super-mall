<template>
    <bscroll :probe-type="2" :mouse-wheel="true" :bounce="false" ref="scroll">
        <simple-list-item
            v-for="item in simpleList"
            :key="item.id"
            :product="item"
            :is-checkbox="isCheckbox"
            :checked-color="checkedColor"
            :is-foot-btn="isFootBtn"
            :btn-text="btnText"
        />
    </bscroll>
</template>

<script>
import Bscroll from '_com/common/bscroll/Bscroll';
import SimpleListItem from './SimpleListItem';

export default {
    name: 'SimpleList',
    props: {
        isCheckbox: {
            type: Boolean,
            default: true
        },
        checkedColor: {
            type: String,
            default: '#ff4500'
        },
        isFootBtn: {
            type: Boolean,
            default: false,
        },
        btnText: {
            type: String,
            default: '找相似'
        },
        simpleList: {
            type: Array,
            default() {
                return [];
            },
        },
    },
    components: {
        Bscroll,
        SimpleListItem,
    },
    // 刷新better-scroll，且必须用activated生命周期，才会同步新增购物车
    activated() {
        this.$refs.scroll.refresh();
    },
};
</script>

<style scoped>
</style>