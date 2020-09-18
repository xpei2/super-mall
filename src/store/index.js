import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getter'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state = {
  // 默认展示tabbar
  tabBarShow: true
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
