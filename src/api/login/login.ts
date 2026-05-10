import request from "@/axios/axios"
import type { AxiosResponse } from "axios"


const authUrl = import.meta.env.VITE_API_AUTH_URL

export async function handleLogin(data: { [key: string]: any }) {
    return request.post({ url: `${authUrl}/login`, data })
}
