import request from "@/axios/axios"

const prefix = import.meta.env.VITE_API_SYSTEM_URL


export async function fetchAddUser({ username, roleId, nickname, id }: { username: string, roleId: number | undefined, nickname: string, id?: number }) {
    return request.post<null>({ url: `${prefix}/user/create`, data: { username, roleId, nickname } })
}

export async function fetchUserStatus(id: number, status: number) {
    return request.put<null>({ url: `${prefix}/user/${id}/status`, data: { status } })
}


export async function fetchEditUser(data: { [key: string]: unknown }) {
    return request.put<null>({ url: `${prefix}/user/edit`, data })
}

export async function deleteUser(data: (string | number)[]) {
    return request.delete<null>({ url: `${prefix}/user/delete`, data })
}