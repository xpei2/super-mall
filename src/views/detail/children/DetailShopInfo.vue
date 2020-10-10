<template>
    <div class="shop-info">
        <div class="shop-top" @click="notClick">
            <img :src="shopInfo.logo" alt />
            <span class="shop-name">{{ shopInfo.name }}</span>
        </div>
        <div class="shop-middle">
            <div class="shop-middle-item shop-middle-lf">
                <div class="info-sells">
                    <div class="sells-count">
                        {{ shopInfo.sells | sellCountFilter }}
                    </div>
                    <div class="sells-text">总销量</div>
                </div>
                <div class="info-goods">
                    <div class="goods-count">{{ shopInfo.goodsCount }}</div>
                    <div class="goods-text">全部宝贝</div>
                </div>
            </div>
            <div class="shop-middle-item shop-middle-rh">
                <table>
                    <tr v-for="(item, index) in shopInfo.score" :key="index">
                        <td>{{ item.name }}</td>
                        <td
                            class="score"
                            :class="{ 'score-better': item.isBetter }"
                        >
                            {{ item.score }}
                        </td>
                        <td
                            class="better"
                            :class="{ 'better-more': item.isBetter }"
                        >
                            <span>{{ item.isBetter ? '高' : '低' }}</span>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="shop-bottom">
            <div class="enter-shop" @click="notClick">进店逛逛</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DetailShopInfo',
    props: {
        shopInfo: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    filters: {
        sellCountFilter(value) {
            return value < 10000 ? value : (value / 10000).toFixed(1) + '万';
        },
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
        },
    },
};
</script>

<style scoped>
.shop-info {
    position: relative;
    padding: 25px 8px;
}
.shop-top {
    display: flex;
    align-items: center;
    font-size: 18px;
}
.shop-top img {
    display: block;
    width: 45px;
    margin-right: 10px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
}
.shop-middle {
    display: flex;
    align-items: center;
    margin-top: 15px;
    color: #333;
}
.shop-middle-item {
    flex: 1;
}
.shop-middle-lf {
    display: flex;
    justify-content: space-evenly;
    text-align: center;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
}
.sells-count,
.goods-count {
    font-size: 18px;
}
.sells-text,
.goods-text {
    font-size: 12px;
    margin-top: 10px;
}
.shop-middle-rh {
    font-size: 13px;
}
.shop-middle-rh table {
    width: 100%;
    padding: 0 23px;
}
.shop-middle-rh table td {
    padding: 5px 0;
}
.shop-middle-rh .score {
    color: #5ea732;
}
.shop-middle-rh .score-better {
    color: #f13e3a;
}
.shop-middle-rh .better span {
    padding: 3px;
    text-align: center;
    color: #ffffff;
    background-color: #5ea732;
}
.shop-middle-rh .better-more span {
    background-color: #f13e3a;
}
.shop-bottom {
    margin-top: 10px;
    text-align: center;
}
.enter-shop {
    font-size: 14px;
    line-height: 30px;
    display: inline-block;
    width: 150px;
    height: 30px;
    text-align: center;
    border-radius: 10px;
    background-color: #f2f5f8;
}
</style>