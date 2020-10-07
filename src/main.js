import Vue from "vue";
// 全局引入懒加载
import { Lazyload } from "vant";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import 'swiper/dist/css/swiper.css';
import 'vant/lib/index.css';

Vue.config.productionTip = false;

// 使用懒加载
Vue.use(Lazyload, {
  // 未加载的占位图片
  loading: require("_ats/img/common/placeholder.png")
});

// 中央事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
