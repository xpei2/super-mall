import Vue from "vue";
import App from "./App.vue";
import ElementUI from 'element-ui';
import router from "./router";
import store from "./store";
import 'element-ui/lib/theme-chalk/index.css';
import 'swiper/dist/css/swiper.css'

Vue.use(ElementUI)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
