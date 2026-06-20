import request from "@/axios/axios"


const prefix = import.meta.env.VITE_API_CONTENT_URL

export async function fetchUploadFile(data: FormData) {
    return request.post<{ filePath: string, originalname: string }>({ url: `${prefix}/upload`, data })
}

export async function fetchCreateContent(data: any) {
    return request.post<{ filePath: string, originalname: string }>({ url: `${prefix}/create`, data })
}

export async function fetchSubmitContent(data: any) {
    return request.put<any>({ url: `${prefix}/content/${data.id}/submit` })
}

export async function fetchPublisthContent(data: any) {
    return request.put<any>({ url: `${prefix}/content/${data.id}/approve` })
}

export async function fetchRejectContent(data: any) {
    return request.put<any>({ url: `${prefix}/content/${data.id}/reject`, data })
}

export async function fetchDeleteContent(id: string | number) {
    return request.delete<null>({ url: `${prefix}/content/delete`, data: { id } })
}