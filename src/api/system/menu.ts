import request from "@/axios/axios"

const prefix = import.meta.env.VITE_API_SYSTEM_URL

export interface MenuParamsType {
    name?: string;
    type?: string;
    [key: string]: unknown
}

export async function getAllMenus({ name, status }: { name?: string, status?: string | number }) {
    return request.get<{ [key: string]: unknown }[]>({ url: `${prefix}/menu/search`, params: { name, status } })
}

export async function addMenu(data: MenuParamsType) {
    return request.post<null>({ url: `${prefix}/menu/create`, data })
}

export async function editMenu(data: MenuParamsType) {
    return request.put<null>({ url: `${prefix}/menu/edit`, data })
}

// 编辑状态
export async function updateMenuStatus(id: number, status: number) {
    return request.put<null>({ url: `${prefix}/menu/${id}/status`, data: { status } })
}

export async function fetchDeleteMenus(data: (string | number)[]) {
    return request.delete<null>({ url: `${prefix}/menu/delete`, data })
}