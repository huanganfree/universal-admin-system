import request from "@/axios/axios";
import { onBeforeMount, ref, watch, type UnwrapRef } from "vue";

/**
 * 表格查询
 * @param initParams 某些参数要固定
 */

export interface InitSearchParams {
    url: string
}

interface PageRes {
    total: number,
    records: any[]
}

export function useTableSearch({ url = '' }: InitSearchParams) {
    const pagination = ref({
        pageSize: 6,
        page: 1,
        showQuickJumper: true,
        total: 0,
        showTotal: (total: number) => `总共 ${total} 条`,
        pageSizeOptions: ['10', '20', '50', '100']
    })

    const filterState = ref({})

    const tableData = ref<any[]>([])
    const loading = ref(false)

    onBeforeMount(() => {
        handleSearch()
    })

    async function handleSearch() {
        loading.value = true
        const params = {
            ...filterState.value,
            page: pagination.value.page,
            pageSize: pagination.value.pageSize
        }
        const { total: count, records } = await request.get<PageRes>({ url, params })// 查询列表就是get方法
        pagination.value.total = count
        tableData.value = records
        loading.value = false
    }

    function resetSearch() {
        pagination.value = Object.assign({ ...pagination.value }, { page: 1, pageSize: 6, current: 1 })
        filterState.value = {}
        handleSearch()
    }

    function handlePageChange(paginationObj: UnwrapRef<typeof pagination> & { current: number }) {
        paginationObj.page = paginationObj.current
        pagination.value = Object.assign({ ...pagination.value }, paginationObj)
        handleSearch()
    }

    return {
        filterState,
        handleSearch,
        tableData,
        resetSearch,
        loading,
        pagination,
        handlePageChange
    }
}