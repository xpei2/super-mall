<template>
    <div class="better-scroll" ref="bsScroll">
        <div class="better-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll';

export default {
    name: 'Bscroll',
    props: {
        /**
         * 1 滚动的时候会派发scroll事件，会截流。
         * 2 滚动的时候实时派发scroll事件，不会截流。
         * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
         */
        probeType: {
            type: Number,
            default: 1
        },
        // 是否启用回弹
        bounce: {
            type: Boolean,
            default: true
        },
        // 是否派发鼠标滚轮
        mouseWheel: {
            type: Boolean,
            default: false
        },
        // 点击列表是否派发click事件
        click: {
            type: Boolean,
            default: true
        },
        // 是否派发滚动事件
        listenScroll: {
            type: Boolean,
            default: false
        },
        // 是否派发滚动到底部的事件，用于上拉加载
        pullUp: {
            type: Boolean,
            default: false
        },
        // 是否派发顶部下拉的事件，用于下拉刷新
        pulldown: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            scroll: null
        };
    },
    // 组件创建完后调用
    mounted() {
        this.$nextTick(() => {
            this._initScroll();
        });
    },
    methods: {
        _initScroll() {
            // 初始化
            this.scroll = new BScroll(this.$refs.bsScroll, {
                probeType: this.probeType,
                mouseWheel: this.mouseWheel,
                bounce: this.bounce,
                click: this.click
            });
            // 滚动位置监听
            if (this.listenScroll) {
                this.scroll.on('scroll', pos => {
                    this.$emit('inScroll', pos);
                });
            }
            // 监听上拉事件
            if (this.pullUp) {
                this.scroll.on('scrollEnd', pos => {
                    if (pos.y <= this.scroll.maxScrollY + 50) {
                        this.$emit('scrollEnd');
                    }
                });
            }
            // 是否派发顶部下拉事件，用于下拉刷新
            if (this.pulldown) {
                this.scroll.on('touchend', pos => {
                    // 下拉动作
                    if (pos.y > 50) {
                        this.$emit('pulldown');
                    }
                });
            }
        },
        refresh() {
            // 代理better-scroll的refresh方法，重新计算高度
            this.scroll && this.scroll.refresh();
        },
        scrollTo(x, y, time = 300) {
            // 代理better-scroll的scrollTo方法
            this.scroll && this.scroll.scrollTo(x, y, time);
        },
        scrollToElement(el, time = 300) {
            // 代理better-scroll的scrollToElement方法
            this.scroll && this.scroll.scrollToElement(el, time);
        },
        getScrollY() {
            return this.scroll ? this.scroll.y : 0;
        }
    }
};
</script>

<style scoped>
.better-scroll {
    overflow: hidden;
}
.better-content {
    position: relative;
}
.pull-msg {
    position: absolute;
    width: 100%;
    font-size: 12px;
    text-align: center;
}
.pull-msg-up {
    top: -20px;
}
.pull-msg-down {
    bottom: -20px;
}
</style>