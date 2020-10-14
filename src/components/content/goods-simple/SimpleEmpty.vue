<template>
    <div class="simple-empty">
        <div margintop class="empty-img">
            <img src="~_ats/img/cart/cart-empty.png" alt="" />
        </div>
        <h3 margintop>{{ emptyTitle }}</h3>
        <p margintop>{{ emptyMsg }}</p>
        <van-button
            margintop
            type="primary"
            plain
            color="var(--color-text)"
            :to="emptyRout"
            >{{ emptyButtonTxt }}</van-button
        >
    </div>
</template>

<script>
import { Button } from 'vant';

export default {
    name: 'SimpleEmpty',
    props: {
        emptyTitle: {
            type: String,
            default: '列表是空的！',
        },
        emptyMsg: {
            type: String,
            default: '列表是空的，先去逛逛吧~',
        },
        emptyRout: {
            type: String,
            default: 'home',
        },
        emptyButtonTxt: {
            type: String,
            default: '去逛逛',
        },
    },
    components: {
        [Button.name]: Button,
    },
};
</script>

<style scoped>
.simple-empty {
    display: flex;
    align-items: center;
    flex-direction: column;
    height: calc(100% - 220px);
    text-align: center;
}
.simple-empty [margintop] {
    margin-top: 20px;
}
.empty-img {
    width: 110px;
    height: 110px;
}
.empty-img img {
    display: block;
    width: 100%;
}
.simple-empty > h3 {
    font-size: 20px;
    font-weight: normal;
}
.simple-empty > p {
    font-size: 14px;
    color: var(--color-text);
}
</style>