<template>
    <ul class="profile-cell">
        <li class="profile-cell-item">
            <van-cell title="我的消息" icon="chat-o" is-link @click="notClick"/>
            <van-cell title="我的收藏" icon="star-o" is-link to="collect"/>
            <van-cell title="收货地址" icon="location-o" is-link  @click="notClick"/>
            <van-cell title="购物车" icon="cart-o" is-link to="cart" />
            <van-cell title="会员卡" icon="vip-card-o" is-link  @click="notClick"/>
        </li>
        <li class="profile-cell-item">
            <van-cell title="积分商城" icon="shopping-cart-o" is-link  @click="notClick"/>
            <van-cell title="关于我们" icon="friends-o" is-link  @click="notClick"/>
        </li>
    </ul>
</template>

<script>
import { Cell } from 'vant';
export default {
    name: 'ProfileCell',
    components: {
        [Cell.name]: Cell,
    },
    methods: {
        notClick() {
            this.$toast({
                type: 'fail',
                message: '暂未开通\n此功能',
                // 弹框的时候禁止点击
                forbidClick: true,
                duration: 1500,
            });
        }
    }
};
</script>

<style scoped>
.profile-cell-item {
    border-top: 10px solid var(--line-color);
}
</style>