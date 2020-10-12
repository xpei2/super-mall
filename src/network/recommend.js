import {
    request
} from './request';

export function getRecommend() {
    // 获取推荐数据
    return request({
        url: '/recommend'
    })
}