import request from "@/axios/axios"

const prefix = import.meta.env.VITE_API_SYSTEM_URL

interface PageRes {
    total: number,
    records: any[]
}

export async function getDictItemByDictCode({ dictCode }: { dictCode: string }) {
    return request.get<{ [key: string]: unknown }[]>({ url: `${prefix}/dictItems`, params: { dictCode } })
}

export async function getRoleList({ page, pageSize, roleName }: { page: number, pageSize: number, roleName?: string }) {
    return request.get<PageRes>({ url: `${prefix}/roles/search`, params: { page, pageSize, roleName } })
}

export async function addRole({ description, roleCode, roleName }: { roleName: string, roleCode: string, description?: string }) {
    return request.post<null>({ url: `${prefix}/role/create`, data: { description, roleCode, roleName } })
}

export async function deleteRoles(data: (string | number)[]) {
    return request.delete<null>({ url: `${prefix}/roles/delete`, data })
}

export async function editRole(data: { [key: string]: unknown }) {
    return request.put<null>({ url: `${prefix}/role/edit`, data })
}

// 编辑角色启用状态
export async function changeRoleStatus(id: number, status: number) {
    return request.put<null>({ url: `${prefix}/role/${id}/status`, data: { status } })
}

