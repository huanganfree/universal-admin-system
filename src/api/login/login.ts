import request from "@/axios/axios"
import type { AuthState } from "@/stores/useAuthStore"


const prefix = import.meta.env.VITE_API_AUTH_URL

export async function handleLogin(data: { [key: string]: any }) {
    return request.post<string>({ url: `${prefix}/login`, data })
}


export async function fetchGetUserInfo() {
    return request.get<AuthState['userInfo']>({ url: `${prefix}/userInfo` })
}