import {
    ADD_CART_COUNTER,
    ADD_CART,
    ADD_COLLECT,
    REMOVE_COLLECT
} from './types'

export default {
    // 设置购物车列表的数据状态
    setCartGoods({
        state,
        commit
    }, data) {
        return new Promise((resolve) => {
            // 此处可能需要获取缓存中的数据，但是在组件created里面已经获取缓存，所以此处不需要了
            // 查找添加的商品id是否已经存在
            let result = state.cartList.find(item => item.id === data.id);

            // 利用actions分发多个commit事件便与调试
            if (result) {
                //分发增加当前商品数量事件
                commit(ADD_CART_COUNTER, result);
                resolve({
                    type: 'text',
                    position: 'bottom',
                    message: `当前商品数量为${result.count}`,
                });
            } else {
                //分发增加当前新商品事件
                commit(ADD_CART, data);
                resolve({
                    type: 'success',
                    position: 'middle',
                    message: `添加购物车成功！`,
                })
            }
        })

    },
    // 设置收藏列表的数据状态
    setCollectGoods({
        state,
        commit
    }, data) {
        return new Promise((resolve) => {
            let result = state.collectList.find(item => item.id === data.id)

            if (result) {
                commit(REMOVE_COLLECT, result.id);
                resolve({
                    //自定义图标
                    icon: 'cross',
                    message: `已取消收藏`,
                });
            } else {
                commit(ADD_COLLECT, data);
                resolve({
                    //自定义图标
                    icon: '',
                    message: `收藏成功`,
                });
            }
        })
    }
}
