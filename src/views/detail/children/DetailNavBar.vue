<template>
        <nav-bar>
            <template v-slot:nav-left>
                <img @click="backClick" src="~_ats/img/common/back.svg" alt="">
            </template>
            <template v-slot:nav-center>
                <span
                    v-for="(value, index) in titles"
                    :key="index"
                    class="title-item"
                    :class="{'title-active': currentIndex === index}"
                    @click="titleClick(index)"
                >{{value}}</span>
            </template>
        </nav-bar>
</template>

<script>
import NavBar from '_com/common/navbar/NavBar';
export default {
    name: 'DetailNavBar',
    components: {
        NavBar
    },
    data() {
        return {
            titles: ['商品', '参数', '评论', '推荐'],
            currentIndex: 0
        };
    },
    methods:{
        titleClick(index) {
            this.currentIndex = index;
            this.$emit('titleClick', index)
        },
        backClick() {
            this.$router.back()
        }
    }
};
</script>

<style scoped>
.title-item {
    flex: 1;
    text-align: center;
}
.title-active {
    color: var(--color-high-text)
}
</style>