<template>
    <div class="rate-info" v-if="Object.keys(rateInfo).length !==0">
        <div class="rate-header">
            <span class="rate-title">用户评价</span>
            <span class="rate-more" @click="moreRateClick">更多</span>
            <span class="base-msg" :class="{'base-msg-show': isShowMsg}">暂无更多</span>
        </div>
        <div class="rate-user">
            <img :src="rateInfo.user.avatar" alt />
            <span>{{rateInfo.user.uname}}</span>
        </div>
        <div class="rate-content">
            <p>{{rateInfo.content}}</p>
            <div class="rate-goods-info">
                <span>{{rateInfo.created | rateDate}}</span>
                <span>{{rateInfo.style}}</span>
            </div>
        </div>
        <div class="rate-images" v-if="rateInfo.images">
            <img
                v-for="(value, index) in rateInfo.images"
                :src="value"
                alt
                :key="index"
            />
        </div>
    </div>
</template>

<script>
import { formatDate } from '_con/utils.js'
export default {
    name: 'DetailRateInfo',
    props: {
        rateInfo: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    data() {
        return {
            isLoadRateImg: false,
            isShowMsg: false
        };
    },
    methods: {
        moreRateClick() {
            // 提示信息展示，后面可删除，且评论图片不需要监听加载是否完成，肯定比商品详情图片加载快
            this.isShowMsg = true;
            let rateTimer = setTimeout(() => {
               this.isShowMsg = false
                clearTimeout(rateTimer);
            }, 2000);
        },
    },
    filters: {
        rateDate(value) {
            const date = new Date(value * 1000);
            return formatDate(date, 'yyyy-MM-dd') 
        }
    }
};
</script>

<style scoped>
.rate-info {
    padding: 5px 12px 10px;
    color: #333333;
    border-bottom: 5px solid #f2f5f8;
}
.rate-header {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 50px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.rate-title {
    font-size: 15px;
}
.rate-more {
    font-size: 13px;
    margin-right: 10px;
}

.rate-user {
    display: flex;
    align-items: center;
    padding: 10px 0;
}
.rate-user img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
}
.rate-user span {
    margin-left: 10px;
}
.rate-content {
    padding: 0 5px;
}
.rate-content p {
    font-size: 14px;
    line-height: 150%;
    color: #777777;
}
.rate-goods-info {
    font-size: 14px;
    margin-top: 10px;
    color: #999999;
}
.rate-goods-info span {
    margin-right: 8px;
}
.rate-images {
    margin-top: 5px;
}
.rate-images img {
    vertical-align: middle;
    width: 70px;
    height: 70px;
    margin-right: 5px;
    margin-top: 5px;
}
</style>