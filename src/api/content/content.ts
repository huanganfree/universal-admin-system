import request from "@/axios/axios"


const prefix = import.meta.env.VITE_API_CONTENT_URL

export async function fetchUploadFile(data: FormData) {
    return request.post<{ filePath: string, originalname: string }>({ url: `${prefix}/upload`, data })
}

export async function fetchCreateContent(data: any) {
    return request.post<{ filePath: string, originalname: string }>({ url: `${prefix}/create`, data })
}