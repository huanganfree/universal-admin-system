import axios, { type AxiosInstance } from "axios";
import { message } from 'ant-design-vue';
import router from "@/router";

const service: AxiosInstance = axios.create({
    baseURL: '',
    timeout: 10000
})

// 请求发出前拦截， return的目的是给then，或者catch使用的
service.interceptors.request.use(function (config) {
    const accessToken = localStorage.getItem('accessToken')
    config.headers.Authorization = `Bearer ${accessToken}`
    return config;
}, function (error) {
    console.log('request-error==', error.response);
    return Promise.reject(error);
});

// 添加响应拦截器, 响应返回的res是浏览器给的
service.interceptors.response.use(function (response) {
    console.log('then-response==', response);
    const { code, data, msg } = response.data || {}
    if (+(code) !== 200) {
        if (+(code) === 401) {
            message.error({
                content: msg || 'token失效，请重新登录',
            });
            router.replace('/login')
        } else {
            message.error({
                content: msg,
            })
        }
        return Promise.reject(msg);
    } else {
        return data;
    }
}, function (error) {
    console.log('error-response==', error.response);
    const { status } = error.response
    const { msg } = error.response.data || {}
    if (+status === 401) {
        message.error({
            content: msg || 'token失效，请重新登录',
        });
        router.replace('/login')
        return
    }
    return Promise.reject(error);
});

const request = {
    get: async ({ url, params }: { url: string, params?: { [key: string]: any } }) => {
        return service.get(url, { params })
    },
    post: async ({ url, data, config }: { url: string, data: { [key: string]: any }, config?: any }) => {
        return service.post(url, data, config)
    },
    put: async ({ url, data }: { url: string, data: { [key: string]: any } }) => {
        return service.put(url, data)
    }
}

export default request