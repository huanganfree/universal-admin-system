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

export async function fetchUnpublishContent(data: any) {
    return request.put<any>({ url: `${prefix}/content/${data.id}/unpublish`, data })
}

export async function fetchDeleteContent(ids: (string | number)[]) {
    return request.delete<null>({ url: `${prefix}/content/delete`, data: ids })
}

export async function fetchContentDetail(id: string | number) {
    return request.get<any>({ url: `${prefix}/detail/${id}` })
}

export async function fetchEditContent(data: any) {
    const { id, ...left } = data
    return request.put<any>({ url: `${prefix}/${id}`, data: left })
}

export async function fetchRestoreContent(id: any) {
    return request.put<any>({ url: `${prefix}/${id}/restore` })
}

// 物理删除
export async function fetchPhysicalDeleteContent(ids: (string | number)[]) {
    return request.delete<null>({ url: `${prefix}/destroy`, data: ids })
}