<template>
    <div
        class="finance-item"
        @click="notClick"
        :class="{ 'finance-item-active': isLink }"
    >
        <p>
            <span class="finance-num">{{ num }}</span>
            <span>{{ company }}</span>
        </p>
        <p class="finance-title">{{ title }}</p>
    </div>
</template>

<script>
export default {
    name: 'FinanceItem',
    props: {
        num: {
            type: String,
            default: '0',
        },
        company: {
            type: String,
            default: '个',
        },
        title: {
            type: String,
            default: '我的余额',
        },
        isLink: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        notClick() {
            this.$toast({
                type: 'success',
                message: '暂未开通\n此功能',
                icon: 'fail',
                // 弹框的时候禁止点击
                forbidClick: true,
                duration: 1500,
            });
        },
    },
};
</script>

<style scoped>
.finance-item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex: 1;
    height: 84px;
}
.finance-item:nth-of-type(n + 2) {
    border-left: 1px solid var(--line-color);
}
.finance-num {
    margin-right: 5px;
    font-size: 20px;
    font-weight: bold;
    color: var(--color-high-text);
}
.finance-title {
    margin-top: 4px;
    font-size: 14px;
}
.finance-item-active {
    cursor: pointer;
}
.finance-item-active:active {
    background-color: #f8f8f8;
}
</style>