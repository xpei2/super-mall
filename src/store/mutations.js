import {
    SET_TABBAR_SHOW,
    SET_LOADING,
    SET_LOCAL_CART,
    ADD_CART_COUNTER,
    ADD_CART,
    CLEAR_CART,
    REMOVE_CART,
    SET_LOCAL_COLLECT,
    ADD_COLLECT,
    REMOVE_COLLECT,
    CLEAR_COLLECT
} from './types'
export default {
    // 设置tabBar显示和隐藏
    [SET_TABBAR_SHOW](state, bol) {
        state.tabBarShow = bol
    },
    // 设置请求加载
    [SET_LOADING](state, bol) {
        state.isLoading = bol
    },
    // 设置购物车列表的本地缓存
    [SET_LOCAL_CART](state, data) {
        state.cartList = data
    },
    // 添加已存在商品数量，并更新缓存
    [ADD_CART_COUNTER](state, result) {
        result.count++;
        //储存缓存
        localStorage.setItem('cartList', JSON.stringify(state.cartList))
    },
    // 添加新商品到购物车列表，并更新缓存
    [ADD_CART](state, data) {
        data.count = 1;
        data. checked = false
        state.cartList.push(data);
        //储存缓存
        localStorage.setItem('cartList', JSON.stringify(state.cartList))
    },
    // 清理购物车列表
    [CLEAR_CART](state) {
        state.cartList = [];
        //储存缓存
        localStorage.setItem('cartList', JSON.stringify(state.cartList))
    },
    // 删除购物车列表
    [REMOVE_CART](state) {
        state.cartList = state.cartList.filter((item) => {
            return item.checked === false
        });
        //储存缓存
        localStorage.setItem('cartList', JSON.stringify(state.cartList))
    },
    // 设置收藏列表的本地缓存数据
    [SET_LOCAL_COLLECT](state, data) {
        state.collectList = data
    },
    // 添加商品到收藏列表，并更新缓存
    [ADD_COLLECT](state, data) {
        data.checked = false
        state.collectList.push(data);
        //储存缓存
        localStorage.setItem('collectList', JSON.stringify(state.collectList))
    },
    // 删除收藏列表中的指定商品，并更新缓存
    [REMOVE_COLLECT](state) {
        state.collectList = state.collectList.filter((item) => {
            return item.checked === false
        })
        //储存缓存
        localStorage.setItem('collectList', JSON.stringify(state.collectList))
    },
}
