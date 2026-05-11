import request from "@/axios/axios"


const prefix = import.meta.env.VITE_API_SYSTEM_URL

export async function getRoleList({ page, pageSize, roleName }: { page: number, pageSize: number, roleName?: string }) {
    return request.get<string>({ url: `${prefix}/roles/search`, params: { page, pageSize, roleName } })
}
