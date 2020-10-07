<template>
    <div class="goods-item" @click="goodsClick">
        <a class="goods-img">
            <img v-lazy="goodsImage" :alt="product.title" @load="imageLoad" />
        </a>
        <a class="good-info">
            <p class="goods-title">{{ product.title }}</p>
            <p class="good-price-box">
                <span class="goods-price">{{ product.price | newPrice }}</span>
                <span class="goods-collect">{{ product.cfav }}</span>
            </p>
        </a>
    </div>
</template>

<script>
import { getDetailGoods } from '_new/detail';

export default {
    name: 'GoodListItem',
    props: {
        product: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    computed: {
        goodsImage() {
            return (
                this.product.img || this.product.image || this.product.show.img
            );
        }
    },
    methods: {
        imageLoad() {
            this.$bus.$emit('itemImageLoad');
        },
        goodsClick() {
            // 点击时暂时取消加载提示
            this.$store.commit('setLoading', false);
            // 点击时先获取数据查看商品是否存在
            getDetailGoods(this.product.iid)
                .then(() => {
                    // 如果成功，开启加载提示，并跳转至详情页
                    this.$store.commit('setLoading', true);
                    this.$router.push('/detail/' + this.product.iid);
                })
                .catch(() => {
                    this.$toast({
                        type: 'success',
                        icon: 'cross',
                        message: '商品已下架！',
                        // 弹框的时候禁止点击
                        forbidClick: true,
                        duration: 1500
                    });
                });
        }
    },
    filters: {
        newPrice(price) {
            return `￥${price}`;
        }
    }
};
</script>

<style scoped>
.goods-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-shrink: 0;
    width: 47%;
    margin-top: 3%;
    border-radius: 5px;
    font-size: 14px;
    background-color: #fff;
    overflow: hidden;
}
.goods-img {
    display: grid;
    place-items: center;
    /* height: 200px; */
    overflow: hidden;
}
.goods-img img {
    display: block;
    width: 100%;
}
.good-info {
    padding: 0 10px;
}
.goods-title {
    display: -webkit-box;
    margin-top: 5px;
    text-overflow: -o-ellipsis-lastline;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height: 150%;
    overflow: hidden;
}
.good-price-box {
    height: 30px;
    display: table-cell;
    vertical-align: middle;
}
.goods-price {
    margin-right: 8px;
    color: var(--color-high-text);
}

.goods-collect {
    position: relative;
    padding-left: 16px;
}

.goods-collect::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 14px;
    height: 14px;
    background: url('~_ats/img/common/collect.svg') 0 0/14px 14px;
}
@media screen and (max-width: 480px) {
    .goods-img {
        height: 200px;
    }
    .goods-img img {
        width: 120%;
    }
}
</style>