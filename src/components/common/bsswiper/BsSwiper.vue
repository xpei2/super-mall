<template>
    <swiper ref="bsSwiper" :options="swiperOptions">
        <swiper-slide v-for="item in banners" :key="item.image">
            <a :href="item.link && item.link">
                <img :src="item.image" :alt="item.title && item.title" @load="swiperLoad" />
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
        banners: Array
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
                    disableOnInteraction: false, //用户操作之后是否禁止自动切换
                    delay: 3000 //1秒切换一次
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
        this.$nextTick(()=>{
            this.swiper.slideToLoop(1);
        })
    },
    computed: {
        swiper() {
            return this.$refs.bsSwiper.$swiper;
        }
    },
    methods: {
        swiperLoad() {
            if (!this.isLoad) {
                this.$bus.$emit('swiperImgLoad');
                this.isLoad = true;
            }
        },
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