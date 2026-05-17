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

// 添加响应拦截器, 响应返回的res是浏览器给的；成功分支返回的是业务 data，与 AxiosResponse 不同
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
        setTimeout(() => {
            window.location.reload()
        }, 300)
        return
    } else {
        message.error({
            content: `502, ${error.response.statusText}`,
        });
    }
    return Promise.reject(error);
});

/** 与响应拦截器一致：resolve 值为后端包里的 data 字段，而非 AxiosResponse */
const request = {
    get: async <T = unknown>({ url, params }: { url: string; params?: { [key: string]: any } }): Promise<T> => {
        return service.get(url, { params }) as Promise<T>
    },
    post: async <T = unknown>({ url, data, config }: { url: string; data: { [key: string]: any }; config?: any }): Promise<T> => {
        return service.post(url, data, config) as Promise<T>
    },
    put: async <T = unknown>({ url, data }: { url: string; data?: { [key: string]: any } }): Promise<T> => {
        return service.put(url, data) as Promise<T>
    },
    delete: async <T = unknown>({ url, data }: { url: string; data: (string | number)[] }): Promise<T> => {
        return service.delete(url, { data }) as Promise<T>
    }
}

export default request
