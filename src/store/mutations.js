import {
  SET_TABBAR_SHOW
} from './types'

export default {
  // 设置tabBar显示和隐藏
  [SET_TABBAR_SHOW](state, isShow) {
    state.tabBarShow = isShow
  }
}
