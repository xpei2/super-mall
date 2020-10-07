<template>
    <swiper ref="bsSwiper" :options="swiperOptions">
        <swiper-slide v-for="item in banners" :key="item.image">
            <a :href="item.link && item.link">
                <img
                    :src="item.image"
                    :alt="item.title && item.title"
                    @load="swiperLoad"
                />
            </a>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
</template>
<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';

export default {
    name: 'bsSwiper',
    props: {
        banners: Array,
        default() {
            return [
                {
                    images: ''
                }
            ];
        }
    },
    data() {
        return {
            swiperOptions: {
                // init: false,
                pagination: {
                    el: '.swiper-pagination',
                    bulletClass: 'bs-bullet',
                    bulletActiveClass: 'bs-bullet-active'
                },
                autoplay: {
                    //用户操作之后是否禁止自动切换
                    disableOnInteraction: false,
                    delay: 3000 //3秒切换一次
                },
                loop: true
            },
            isLoad: false
        };
    },
    components: {
        Swiper,
        SwiperSlide
    },
    mounted() {
        this.$nextTick(() => {
            // 设置轮播图默认是第一张
            this.swiper.slideToLoop(1);
        });
    },
    computed: {
        swiper() {
            // 获取轮播节点
            return this.$refs.bsSwiper.$swiper;
        }
    },
    methods: {
        swiperLoad() {
            // 中央事件总线，监听轮播图加载了一张图片
            if (!this.isLoad) {
                this.$bus.$emit('swiperImgLoad');
                this.isLoad = true;
            }
        }
    }
};
</script>
<style>
.bs-bullet {
    display: inline-block;
    width: 8px;
    height: 8px;
    margin: 0 4px;
    border-radius: 50%;
    background-color: #fff;
}
.bs-bullet-active {
    background-color: rgba(212, 62, 46, 1);
}
</style>