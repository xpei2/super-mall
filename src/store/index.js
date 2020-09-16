import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    homeTabIndex: 0
  },
  mutations: {
    homeTabIndex(state, index) {
      state.homeTabIndex = index
    }
  },
  actions: {},
  modules: {}
})
