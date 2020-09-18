<template>
    <div v-if="Object.keys(baseInfo).length !== 0">
        <div class="info-cont info-top">
            <div class="info-title">{{baseInfo.title}}</div>
            <div class="info-price">
                <span class="new-price">{{baseInfo.newPrice}}</span>
                <span class="old-price">{{baseInfo.oldPrice}}</span>
                <span
                    v-if="baseInfo.discount"
                    :style="discountBgColor"
                    class="discount"
                >{{baseInfo.discount}}</span>
            </div>
        </div>
        <div class="info-cont info-other">
            <span v-for="value in baseInfo.columns" :key="value">{{value}}</span>
        </div>
        <div class="info-cont info-service">
            <span class="info-service-item" v-for="item in baseInfo.services" :key="item.name">
                <img v-if="item.icon" :src="item.icon" alt />
                <span>{{item.name}}</span>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DetailBaseInfo',
    props: {
        baseInfo: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    computed: {
        discountBgColor() {
            return {
                'background-color': this.baseInfo.discountBgColor
                    ? this.baseInfo.discountBgColor
                    : '#ff5777'
            };
        }
    }
};
</script>

<style scoped>
.info-cont {
    display: flex;
    align-items: center;
    padding: 13px 8px;
    border-bottom: 8px solid #f8f8f8;
}
.info-top {
    display: block;
}
.info-title {
    color: #000;
}
.info-price {
    display: flex;
    align-items: center;
    margin-top: 13px;
}
.new-price {
    margin-right: 5px;
    font-size: 20px;
    color: var(--color-high-text);
}
.old-price {
    font-size: 12px;
    text-decoration: line-through;
}
.discount {
    display: inline-block;
    margin-top: -9px;
    margin-left: 5px;
    padding: 2px 5px;
    border-radius: 7px;
    font-size: 13px;
    color: #fff;
}
.info-other {
    justify-content: space-between;
    font-size: 14px;
    color: var(--color-text);
    opacity: 0.6;
}
.info-service {
    justify-content: space-between;
    font-size: 14px;
}
.info-service img {
    width: 12px;
    margin-bottom: -1px;
}
</style>