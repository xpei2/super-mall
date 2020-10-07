<template>
    <div class="cart-item">
        <van-checkbox v-model="product.checked" :checked-color="checkedColor"></van-checkbox>
        <van-card
            :num="product.count"
            :price="product.price"
            :desc="product.desc"
            :title="product.title"
            :thumb="product.image"
        />
    </div>
</template>

<script>
import { Checkbox, Card } from 'vant';

export default {
    name: 'CartListItem',
    props: {
        product: {
            type: Object,
            default() {
                return {}
            }
        },
        checkedColor: String
    },
    components: {
        [Checkbox.name]: Checkbox,
        [Card.name]: Card
    }
};
</script>

<style scoped>
.cart-item {
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgb(204, 203, 203);
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
</style>