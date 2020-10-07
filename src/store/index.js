import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getter'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state = {
    // 默认展示tabbar
    tabBarShow: true,
    // 购物车数据保存
    cartList: [],
    // 收藏数据保存
    collectList: [],
    // 是否显示请求加载
    isLoading: true
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})
