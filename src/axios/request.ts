import axios from "axios";
import { message } from 'ant-design-vue';

const token = 'eyJraWQiOiJkZjU2YTBiNi03MGRmLTRmZDUtYTFmNC0zNGRjYzAwNjAwYzYiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxODEzNjg3NTIzNiIsImF1ZCI6Im9hdXRoLWNsaWVudCIsInVpZCI6MjAwNDA3MzI5NjM5NzgwMzUyMSwibmJmIjoxNzc3NTE0MTM3LCJpc3MiOiJodHRwOi8vMTcyLjI0LjIzMS4yMDM6MzAzMCIsImV4cCI6MTc4NjE1NDEzNywiaWF0IjoxNzc3NTE0MTM3LCJqdGkiOiIwOGQ2NTIyOC05MzIxLTQwYWYtYmY4Ni05ODQxNTc2NmExZGMifQ.q6xoe0kDLvajqSAVQ63OnLkNFHJdZ9cs5ETJqiAqIoUVVj7owbygmqGgaPqCITPL3KWCGgP6WNXS07iPnCbggyeLFwqKLSb-1VV3NN0y1zQnWzh7ouCEM6WVrxGiNG6029Ii6XQYI-mzkWEvAFzzKgC1CTGQsDIe8P96dZ_4m7CEyE78vWAYa08r80wZMjMz4T0v5czdHf98nrq2nCaI1kWt3W5i4c2ezcEj5ZMU9B1y_CnDXJXB2QFoS8bnNrAkKLGi10IhMg49AnW1PyCsSaOVIJzNjPy2EZVxtZ8hPd3y8GEAnUtH2oxRXJL74boB3IzCwSOEyprQQp3ZheQc0A'

const service = axios.create({
    baseURL: '',
    timeout: 10000,
    headers: {
        Authorization: "Bearer " + token
    }
})

// 请求发出前拦截， return的目的是给then，或者catch使用的
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    console.log('request-error==', error.response);
    return Promise.reject(error);
});

// 添加响应拦截器, 响应返回的res是浏览器给的
service.interceptors.response.use(function (response) {
    console.log('then-response==', response);
    const res = response.data
    if (res.code !== 200) {
        if (res.code === 401) {
            message.error({
                content: res.message || '登录失效，请重新登录',
            });
            return
        }
    }
    console.log(res);
    return res;
}, function (error) {
    console.log('error-response==', error.response);
    const { status } = error.response
    const { message: msg } = error.response.data || {}
    if (status === 401) {
        message.error({
            content: msg || '登录失效，请重新登录',
        });
    }
    return Promise.reject(error);
});

export default service