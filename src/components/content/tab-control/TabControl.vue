<template>
    <ul class="tab-control">
        <li
            class="tab-control-item"
            v-for="(item, index) in titles"
            :class="{'control-active': index===currentIndex}"
            @click="tabControlActive(index)"
            :key="index"
        ><span>{{item}}</span></li>
    </ul>
</template>

<script>
export default {
    name: 'TabControl',
    props: {
        titles: Array,
        default() {
            return ['流行', '精选', '新款']
        }
    },
    data() {
        return {
            currentIndex: 0
        };
    },
    methods: {
        tabControlActive(index) {
            this.currentIndex = index;
            this.$emit('tabClick', index)
        }
    }
};
</script>

<style scoped>
.tab-control {
    display: flex;
    justify-content: space-around;
}
.tab-control-item {
    flex: 1;
    font-size: 15px;
    line-height: 40px;
    text-align: center;
}
.control-active {
    color: var(--color-high-text);
}
.control-active span {
    padding: 4px;
    border-bottom: 2px solid var(--color-high-text);
}
</style>