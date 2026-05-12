import request from "@/axios/axios"

const prefix = import.meta.env.VITE_API_SYSTEM_URL

interface PageRes {
    total: number,
    records: any[]
}

export async function getRoleList({ page, pageSize, roleName }: { page: number, pageSize: number, roleName?: string }) {
    return request.get<PageRes>({ url: `${prefix}/roles/search`, params: { page, pageSize, roleName } })
}
