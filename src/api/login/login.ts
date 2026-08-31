import request from "@/axios/axios"
import type { AuthState } from "@/stores/useAuthStore"


const prefix = import.meta.env.VITE_API_AUTH_URL

export async function handleLogin(data: { [key: string]: any }) {
    return request.post<{ accessToken: string; refreshToken: string }>({ url: `${prefix}/login`, data })
}

export async function handleLogout(data: { refreshToken: string }) {
    return request.post<any>({ url: `${prefix}/logout`, data })
}

export async function fetchRefreshToken(data: { refreshToken: string }) {
    return request.post<string>({ url: `${prefix}/refresh`, data })
}

export async function fetchGetUserInfo() {
    return request.get<AuthState['userInfo']>({ url: `${prefix}/userInfo` })
}

export async function fetchGetUserMenus() {
    return request.get<any>({ url: `${prefix}/menus` })
}