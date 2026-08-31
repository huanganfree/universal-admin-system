import axios, { type AxiosInstance } from "axios";
import { message } from 'ant-design-vue';
import router from "@/router";
import { fetchRefreshToken } from "@/api/login/login";

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

// 是否正在刷新的状态标记，防止重复调用刷新接口
let isRefreshing = false;

// 存储被挂起的请求队列（暂存所有 401 的请求）
// 数组里的每一个项都是一个回调函数，接收新 Token 并重新执行请求
let requestsQueue: Array<(token: string) => void> = [];

// 添加响应拦截器, 响应返回的res是浏览器给的
service.interceptors.response.use(function (response) {
    console.log('then-response==', response);
    const { code, data, msg } = response.data || {}
    if (+(code) !== 200) {
        if (+(code) === 401) {
            message.error({
                content: msg || 'token失效，请重新登录',
            });
            router.push('/login')
        } else {
            message.error({
                content: msg
            })
        }
        return Promise.reject(msg);
    } else {
        return data;
    }
}, async function (error) {
    console.log('error-response==', error.response);
    const { status } = error.response
    const { msg } = error.response.data || {}
    if (+status === 401) {
        // message.error({
        //     content: msg || 'token失效，请重新登录',
        // });
        // router.replace('/login')
        const config = error.config;
        if (!isRefreshing) {
            isRefreshing = true;
            const token = localStorage.getItem('refreshToken') as string;
            try {
                const refreshRes = await fetchRefreshToken({ refreshToken: token })
                if (refreshRes) {
                    const newAccessToken = refreshRes;
                    // 1. 将最新的 Token 更新到本地存储中
                    localStorage.setItem('accessToken', newAccessToken);

                    // 2. 关键：遍历重试队列，把之前所有挂起排队的请求用新 Token 全部重新执行一遍
                    requestsQueue.forEach((callback) => callback(newAccessToken));
                    requestsQueue = []; // 清空队列

                    // 3. 重新执行当前第一个触发刷新的请求
                    config.headers.Authorization = `Bearer ${newAccessToken}`;
                    return service(config);
                } else {
                    // 如果刷新接口返回的不是 200，说明 Refresh Token 也失效了
                    throw new Error('Refresh Token Invalid');
                }
            } catch (error) {

            } finally {
                isRefreshing = false;
            }

        } else {
            // 🌟 绝妙之处：利用 Promise 的特性，返回一个未决断的 Promise，把 resolve 权交出去
            return new Promise((resolve) => {
                // 将当前的重试逻辑包装成一个函数塞入队列中
                requestsQueue.push((newAccessToken: string) => {
                    // 用新 Token 覆盖旧配置中的 Authorization
                    config.headers.Authorization = `Bearer ${newAccessToken}`;
                    // 重新发送该请求，并将结果 resolve 出去，前端页面就能像什么都没发生一样正常拿到数据
                    resolve(service(config));
                });
            });
        }
    } else {
        message.error({
            content: `500, ${error.response.statusText}`,
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
    delete: async <T = unknown>({ url, data }: { url: string; data: Array<string | number> }): Promise<T> => {
        return service.delete(url, { data }) as Promise<T>
    }
}

export default request
