<template>
    <nav-bar nav-color nav-bg-color="#fff">
        <template v-slot:nav-left>
            <van-icon @click="backClick" name="arrow-left" />
        </template>
        <template v-slot:nav-center>
            <span
                v-for="(value, index) in titles"
                :key="index"
                class="title-item"
                :class="{ 'title-active': currentIndex === index }"
                @click="titleClick(index)"
                >{{ value }}</span
            >
        </template>
    </nav-bar>
</template>

<script>
import NavBar from '_com/common/navbar/NavBar';
import { Icon } from 'vant';
import { backBtnMixin } from '_con/mixin';
export default {
    name: 'DetailNavBar',

    data() {
        return {
            titles: ['商品', '参数', '评论', '推荐'],
            currentIndex: 0,
        };
    },
    components: {
        NavBar,
        [Icon.name]: Icon,
    },
    mixins: [backBtnMixin],
    methods: {
        titleClick(index) {
            this.currentIndex = index;
            this.$emit('titleClick', index);
        },
    },
};
</script>

<style scoped>
.title-item {
    flex: 1;
    text-align: center;
}
.title-active {
    color: var(--color-high-text);
}
.van-icon {
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    font-size: 22px;
}
</style>