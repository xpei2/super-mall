import {
    request
} from './request';

export function getCategory() {
    // 获取分类列表
    return request({
        url: '/category'
    })
}

export function getSubCategory(maitKey) {
    // 获取子分类列表
    return request({
        url: '/subcategory',
        params: {
            maitKey
        }
    })
}

export function getCategoryDetail(miniWallkey, type) {
    // 获取分类推荐商品数据
    return request({
        url: "/subcategory/detail",
        params: {
            miniWallkey,
            type
        }
    })
}