<template>
    <div class="simple-item">
        <van-checkbox
            v-show="isCheckbox"
            v-model="product.checked"
            :checked-color="checkedColor"
        ></van-checkbox>
        <van-card
            :num="product.count"
            :price="product.price"
            :desc="descText"
            :title="product.title"
            :thumb="product.image"
            @click="goodsClick"
        >
            <template v-if="isFootBtn" #footer>
                <van-button
                    size="mini"
                    plain
                    round
                    color="#c8c9cc"
                    to="category"
                    >{{ btnText }}</van-button
                >
            </template>
        </van-card>
    </div>
</template>

<script>
import { getDetailGoods } from '_new/detail';
import { Checkbox, Card, Button } from 'vant';

export default {
    name: 'SimpleListItem',
    props: {
        // 产品数据
        product: Object,
        // 描述位置显示类型
        simpleDesc: String,
        // 是否显示复选按钮
        isCheckbox: Boolean,
        // 复选按钮的颜色
        checkedColor: String,
        // 是否显示底部按钮
        isFootBtn: Boolean,
        // 按钮文字
        btnText: String,
    },
    components: {
        [Checkbox.name]: Checkbox,
        [Card.name]: Card,
        [Button.name]: Button,
    },
    computed: {
        descText() {
            let desc = '';
            switch (this.simpleDesc) {
                case 'cartDesc':
                    desc = this.product.desc;
                    break;
                case 'collectDesc':
                    desc = this.product.collect;
                    break;
            }
            return desc;
        },
    },
    methods: {
        goodsClick() {
            // 点击时暂时取消加载提示
            this.$store.commit('setLoading', false);
            // 点击时先获取数据查看商品是否存在
            getDetailGoods(this.product.id)
                .then(() => {
                    // 如果成功，开启加载提示，并跳转至详情页
                    this.$store.commit('setLoading', true);
                    this.$router.push('/detail/' + this.product.id);
                })
                .catch(() => {
                    this.$toast({
                        type: 'success',
                        icon: 'fail',
                        message: '商品已下架！',
                        // 弹框的时候禁止点击
                        forbidClick: true,
                        duration: 1500,
                    });
                });
        },
    },
};
</script>

<style scoped>
.simple-item {
    display: flex;
    align-items: center;
}
.simple-item:nth-of-type(n + 2) {
    border-top: 1px solid rgb(204, 203, 203);
}
.van-checkbox {
    flex-shrink: 0;
    margin-left: 8px;
}
.van-card {
    flex: 1;
    width: 80%;
    padding: 10px 10px 8px;
    background: none;
}
.van-card:not(:first-child) {
    margin-top: 0;
}
.van-card__title {
    font-size: 14px;
}
.van-card__desc {
    margin-top: 5px;
}
.van-card__thumb {
    height: 100px;
}
.van-card__price {
    color: #ff4500;
}
.van-card__footer {
    position: absolute;
    right: 7px;
    bottom: 7px;
}
</style>