import axios from 'axios'
import {
  Toast
} from "vant";

import Loading from '../store/index'
// 最终
export function request(config) {
  // 1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/w6',
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
