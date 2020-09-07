<template>
    <div class="better-scroll" ref="btscroll">
        <div class="better-content">
            <!-- <div class="pull-msg pull-msg-up">{{pullDownMsg}}</div> -->
            <slot></slot>
            <!-- <div class="pull-msg pull-msg-down">{{pullUpMsg}}</div> -->
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll';

export default {
    name: 'Bscroll',
    data() {
        return {
            bsScroll: null
        };
    },
    // 组件创建完后调用
    mounted() {
        this.bsScroll = new BScroll(this.$refs.btscroll, {
            probeType: 2,
            // pullUpLoad: true, //监听是否滚动到底部
            click: true,      //滚动内部点击事件是否有效
        });
        // this.bsScroll.on('scroll', pos => {
        //     if (pos.y > 40 && pos.y < 100) {
        //         this.pullDownMsg = '下拉刷新，发现更多';
        //     }else if(pos.y <40) {
        //         this.pullDownMsg = ''
        //     }
        // });
        // this.bsScroll.on('touchEnd', pos => {
        //     if (pos.y > 40) {
        //         console.log('加载中...');
        //     }
        // });
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