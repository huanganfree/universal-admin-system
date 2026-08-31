
import request from "@/axios/axios";
import { message } from "ant-design-vue";
import { onBeforeMount, ref, watch, type UnwrapRef } from "vue";

/**
 * 表格查询
 * @param initParams 某些参数要固定
 */

export interface InitSearchParams {
    url: string;
    initParams?: { [key: string]: any };
    transformParams?: (param: any) => { [key: string]: any };
    isAll?: boolean;
    transformData?: (param: any[]) => any[];
}

interface PageRes {
    total: number,
    records: any[]
}

const initPagination = {
    pageSize: 10,
    page: 1,
    showQuickJumper: true,
    total: 0,
    showTotal: (total: number) => `总共 ${total} 条`,
    pageSizeOptions: ['10', '20', '50', '100']
}

export function useTableSearch({ url = '', initParams, transformParams, isAll = false, transformData }: InitSearchParams) {
    const pagination = ref(initPagination)

    const filterState = ref({ ...initParams })
    const selectedRowKeys = ref<(string | number)[]>([])

    const tableData = ref<any[]>([])
    const loading = ref(false)

    onBeforeMount(() => {
        handleSearch()
    })

    function handleSelectChange(params: any[]) {
        selectedRowKeys.value = params
    }

    async function handleSearch() {
        if (!url) return
        loading.value = true
        const params = {
            ...(transformParams ? transformParams(filterState.value) : filterState.value),
            page: pagination.value.page,
            pageSize: pagination.value.pageSize
        }
        try {
            if (!isAll) {
                const { total: count, records } = await request.get<PageRes>({ url, params })// 查询列表就是get方法
                pagination.value.total = count
                tableData.value = records
            } else {
                const { page, pageSize, ...left } = params
                const records = await request.get<any[]>({ url, params: left })// 查询列表就是get方法
                if (transformData) {
                    tableData.value = transformData(records)
                } else {
                    tableData.value = records
                }
            }
        } catch (error) {

        } finally {
            loading.value = false
        }
    }

    function resetSearch() {
        pagination.value = Object.assign({ ...pagination.value }, { page: 1, pageSize: initPagination.pageSize, current: 1 })
        filterState.value = {}
        handleSearch()
    }

    function handlePageChange(paginationObj: UnwrapRef<typeof pagination> & { current: number }) {
        paginationObj.page = paginationObj.current
        pagination.value = Object.assign({ ...pagination.value }, paginationObj)
        handleSearch()
    }

    async function handleConfirmDelete(params: (string | number)[], delectFunc: (arg: any) => Promise<null>) {
        // await deleteRoles(params)
        await delectFunc(params)
        message.success('删除成功！');
        selectedRowKeys.value = []
        handleSearch()
    }

    async function handleStatusChange(status: number, record: any, func: (id: number, status: number) => Promise<any>) {
        // await changeRoleStatus(record.id, status)
        try {
            await func(record.id, status)
            message.success('操作成功！');
            handleSearch()
        } catch (error) {
            record.status = status ? 0 : 1
            tableData.value = [...tableData.value]
        }
    }

    return {
        filterState,
        handleSearch,
        tableData,
        resetSearch,
        loading,
        pagination,
        handlePageChange,
        handleConfirmDelete,
        handleSelectChange,
        selectedRowKeys,
        handleStatusChange
    }
}