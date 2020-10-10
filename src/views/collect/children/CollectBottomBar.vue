<template>
    <van-submit-bar
        :price="totalPrice"
        :button-text="submitBtn"
        :button-color="checkedColor"
        @submit="onSubmit"
        text-align="left"
        :class="{ opacity: checkedCount === 0 }"
    >
        <div @click="checkedAllClick">
            <van-checkbox
                v-model="checkedAll"
                :checked-color="checkedColor"
                >全选</van-checkbox
            >
        </div>
        <!-- <template #tip>
            你的收货地址不支持同城送,
            <span @click="onClickEditAddress">修改地址</span>
        </template> -->
    </van-submit-bar>
</template>

<script>
import { SubmitBar, Checkbox } from 'vant';
import { mapGetters } from 'vuex';

export default {
    name: 'CollectBottomBar',
    props: {
        checkedColor: String,
        // 用传过来的父组件的计算属性，如果将checkedAllClick电机事件绑定到van-checkbox上面，会发生直接修改props值的错误
        checkedAll: Boolean
    },
    components: {
        [SubmitBar.name]: SubmitBar,
        [Checkbox.name]: Checkbox
    },
    methods: {
        checkedAllClick() {
            //全选按钮点击时将所有购物车商品的checked设置为全选按钮相反的状态
            this.cartList.forEach(item => (item.checked = !this.checkedAll));
        },
        onSubmit() {
            if (this.checkedCount === 0) {
                this.$toast({
                    type: 'fail',
                    message: '您还未选中宝贝哦！',
                    forbidClick: true,
                    duration: 1500
                });
            }else {
                this.$toast({
                    type: 'fail',
                    message: '暂未开通\n此功能',
                    forbidClick: true,
                    duration: 1500
                });
            }
        },
    },
    computed: {
        ...mapGetters(['cartList']),
        // 计算选中商品的数量
        checkedCount() {
            return this.cartList.filter(item => item.checked).length;
        },
        // 计算选中商品的总价格
        totalPrice() {
            return (
                this.cartList
                    .filter(item => item.checked)
                    .reduce((pre, item) => pre + item.price * item.count, 0) *
                100
            );
        },

        // 设置提交按钮的商品个数
        submitBtn() {
            return `结算(${this.checkedCount})`;
        }
    }
};
</script>

<style scoped>
.van-submit-bar {
    border-top: 1px solid rgb(204, 203, 203);
}
.van-submit-bar__text {
    display: flex;
    align-items: center;
    padding-left: 12px;
}
.van-button--normal {
    padding: 0;
    font-size: 16px;
}
.opacity .van-button {
    opacity: 0.5;
}
</style>