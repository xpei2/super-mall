<template>
    <div v-if="Object.keys(goodsInfo).length !== 0">
        <div class="detail-msg"><span>详情</span></div>
        <div class="goods-desc clear-fix">
            <span class="desc-border desc-border-t"></span>
            <p class="desc-txt">{{goodsInfo.desc}}</p>
            <span class="desc-border desc-border-b"></span>
        </div>
        <ul class="goods-image">
            <li v-for="item in goodsInfo.detailImage" :key="item.key">
                <h3 class="base-info-msg"><span>{{item.key}}</span></h3>
                <div class="image-list">
                    <img
                        v-for="value in item.list"
                        :src="value"
                        :key="value"
                        alt
                        @load="goodsImgLoad"
                    />
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'DetailGoodsInfo',
    props: {
        goodsInfo: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    data() {
        return {
            counter: 0,
            imagesLength: 0
        };
    },
    methods: {
        goodsImgLoad() {
            ++this.counter === this.imagesLength && this.$emit('imgLoad');
        }
    },
    watch: {
        goodsInfo() {
            // 监听数据改变后获取所有图片的个数
            this.goodsInfo.detailImage.forEach(item => {
                this.imagesLength += item.list.length;
            });
        }
    }
};
</script>

<style scoped>
.detail-msg {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 6px 0;
    background-color: #f2f2f2;
    color: #999;
}
.detail-msg::after {
        content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: -1;
    height: 1px;
    width: 120px;
    margin-left: -60px;
    background-color: #666;
}
.detail-msg span {
    position: relative;
    padding: 0 10px;
    background-color: #f2f2f2;
}
.goods-desc {
    padding: 10px 15px;
    box-sizing: border-box;
}
.desc-border {
   display: block;
    height: 5px;
    width: 63px;
    border-width: 1px 4px;
    border-style: solid;
}
.desc-border-t {
    float: left;
    border-color: transparent transparent #000 #000;
}
.desc-border-b {
    float: right;
    border-color: transparent #000 #000 transparent;
}
.desc-txt {
    float: left;
    width: 100%;
    padding: 10px 0;
}
.image-list img {
    display: block;
    width: 100%;
}
</style>