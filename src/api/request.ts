const baseUrl = "http://localhost:8080/api/blog/"

import { errTips } from "@/utils";
// 请求加载动画
import axios from "axios";
import {useStore} from "@/stores"

const request = axios.create({
    baseURL: baseUrl,
    timeout: 1000 * 3,
})

// 请求拦截器
request.interceptors.request.use((config) => {
    // NProgress.start();
    return config;
}, error => {
    return Promise.reject(error);
})
// 响应拦截器
request.interceptors.response.use(response => {
    if(response.data.status==444){
        errTips("身份验证已过期,请重新登录!")
        useStore().exit()
    }
    else if(response.data.status == 443){
        errTips("无此权限");
    }
    return response;
}, error => {
    return Promise.reject(error);
});


export default request;