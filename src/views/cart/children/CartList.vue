<template>
    <bscroll
        class="cart-scroll"
        :probe-type="2"
        :mouse-wheel="true"
        :bounce="false"
        ref="scroll"
    >
        <cart-list-item
            v-for="item in cartList"
            :key="item.id"
            :product="item"
            :checked-color="checkedColor"
        />
    </bscroll>
</template>

<script>
import Bscroll from '_com/common/bscroll/Bscroll';
import CartListItem from './CartListItem';

export default {
    name: 'CartList',
    props: {
        checkedColor: String,
        cartList: {
            type: Array,
            default() {
                return []
            }
        }
    },
    components: {
        Bscroll,
        CartListItem
    },
    activated() {
        this.$refs.scroll.refresh();
    }
};
</script>

<style scoped>
.cart-scroll {
    height: calc(100% - 50px);
}
</style>