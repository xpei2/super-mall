<template>
  <swiper ref="mySwiper" :options="swiperOptions">
    <swiper-slide v-for="item in banners" :key="item.image">
      <a :href="item.link">
        <img :src="item.image" :alt="item.title" @load="swiperLoad"/>
      </a>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>
<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';

export default {
  name: 'HomeSwiper',
  props: {
    banners: Array
  },
  data() {
    return {
      swiperOptions: {
        // init: false,
        pagination: {
          el: '.swiper-pagination',
          bulletClass : 'home-bullet',
          bulletActiveClass: 'home-bullet-active'
        },
        autoplay: {
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
    this.swiper.slideTo(1)
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    }
  },
  methods: {
      swiperLoad() {
          if(!this.isLoad) {
              this.$emit('swiperImgLoad');
              this.isLoad = true
          }
      }
  }
};
</script>
<style>
.swiper-container img {
  display: block;
  width: 100%;
}
.home-bullet {
  display: inline-block;
  width: 8px;
  height: 8px;
  margin: 0 4px;
  border-radius: 50%;
  background-color: #fff;
}
.home-bullet-active {
  background-color: rgba(212, 62, 46, 1);
}
</style>