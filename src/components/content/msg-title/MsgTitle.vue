<template>
    <div class="msg-title" :style="msgStyle"><span class="msg-text">{{title}}</span></div>
</template>

<script>
export default {
    name: 'MsgTitle',
    props: {
        title: {
            type: String,
            default: '更多',
        },
        bgColor: {
            type: String,
            default: '#f2f2f2',
        },
        color: {
            type: String,
            default: '#999',
        },
    },
    computed: {
        msgStyle() {
            return {'background-color': this.bgColor, 'border-color': this.color, 'color':this.color}
        }
    }
};
</script>

<style scoped>
.msg-title {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 6px 0;
}
.msg-text {
    position: relative;
    padding: 0 10px;
}
.msg-text::after,.msg-text::before {
    content: '';
    position: absolute;
    top: 50%;
    height: 0;
    width: 30px;
    border-top-style: solid;
    border-top-width: 1px;
    border-top-color: inherit;
}
.msg-text::before{
    left: -30px;
}
.msg-text::after{
    right: -30px;
}
</style>