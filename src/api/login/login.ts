import request from "@/axios/axios"


const prefix = import.meta.env.VITE_API_AUTH_URL

export async function handleLogin(data: { [key: string]: any }) {
    return request.post<string>({ url: `${prefix}/login`, data })
}
