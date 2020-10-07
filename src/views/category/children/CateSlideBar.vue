<template>

        <van-sidebar ref="vanSlider" v-model="curIndex">
            <span class="slidebar-active" :style="slideActive"></span>
            <!-- , height: `${slideItemHeight}px` -->
            <van-sidebar-item
                v-for="(item, index) in slideBarList"
                :key="item.maitKey"
                :title="item.title"
                @click="slideItemClick(item.maitKey, item.miniWallkey, index)"
            />
        </van-sidebar>
</template>

<script>
import { Sidebar, SidebarItem } from 'vant';
export default {
    name: 'CateSlideBar',
    components: {
        [Sidebar.name]: Sidebar,
        [SidebarItem.name]: SidebarItem
    },
    props: {
        slideBarList: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    data() {
        return {
            curIndex: 0,
            slideItemHeight: 0
        };
    },
    watch: {
        slideBarList() {
            this.$nextTick(() => {
                this.slideItemHeight =
                    this.$refs.vanSlider.$el.clientHeight /
                    this.slideBarList.length;
                    this.$emit('slideLoad');
            });
        }
    },
    computed: {
        slideActive() {
            return { top: `${this.curIndex * this.slideItemHeight}px` };
        }
    },
    methods: {
        slideItemClick(key1, key2, index) {
            const obj = {
                maitKey: key1,
                miniWallkey: key2,
                index
            };
            this.$emit('slideItemClick', obj);
        }
    }
};
</script>

<style scoped>
.van-sidebar {
    position: relative;
    width: 100%;
}
.van-sidebar-item {
    padding: 0;
    line-height: 45px;
    text-align: center;
}
.van-sidebar-item--select {
    border-radius: 5px;
    font-weight: bold;
    color: var(--color-tint);
}
.van-sidebar-item--select::before {
    display: none;
}
.slidebar-active {
    position: absolute;
    top: 0px;
    left: 0;
    z-index: 1;
    width: 3px;
    height: 45px;
    background-color: var(--color-tint);
    transition: top 0.3s;
}
</style>