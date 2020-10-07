export default {
    // 购物车列表
    cartList: state => state.cartList,
    cartCount: (state, getters) => getters.cartList.length,
    // 收藏列表
    collectList: state => state.collectList,
    collectCount: (state, getters) => getters.collectList.length,
    // 映射请求加载
    // isLoading: state => state.isLoading
};
