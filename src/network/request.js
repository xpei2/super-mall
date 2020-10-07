import axios from 'axios'
import {
    Toast
} from "vant";

import Loading from '../store/index'
export function request(config) {
    // 1.创建axios实例
    const instance = axios.create({
        // 本接口为假接口,真实接口请添加老师微信coderwhy
        baseURL: 'xxx',
        timeout: 5000
    })

    // 2.拦截器
    // 2.1请求拦截
    instance.interceptors.request.use(config => {
        Loading.state.isLoading && Toast.loading({
            forbidClick: true,
            message: "加载中...",
            loadingType: 'spinner',
        });
        return config
    }, err => {
        return Promise.reject(err);
    })

    // 2.2响应拦截
    instance.interceptors.response.use(res => {
        Toast.clear();
        return res.data
    }, err => {
        Toast.clear();
        return Promise.reject(err);
    })
    // 3.发送真正的网络请求
    return instance(config)
}
