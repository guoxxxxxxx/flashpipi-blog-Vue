import axios from 'axios';

const service = axios.create({
    baseURL: '',
    timeout: 10000,
    withCredentials: false,     // 异步请求是否携带cookie
    headers:{
        // 设置后端所需要传递的参数
    }
})

export default service;