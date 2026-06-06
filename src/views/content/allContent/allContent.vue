<template>
    <a-flex :gap="10" vertical>
        <a-card :bordered="false">
            <TableFilter :columns="queryColumns" v-model="filterState" @search="handleSearch" @reset="resetSearch" />
        </a-card>
        <a-card :bordered="false">
            <a-flex :gap="10" vertical>
                <a-space>
                </a-space>
                <a-table :columns="columns" :data-source="tableData" :rowKey="'id'" :loading="loading"
                    :pagination="pagination" @change="handlePageChange" :scroll="{ x: 1200 }">
                    <template #bodyCell="{ column, record }">
                        <template v-if="column.dataIndex === 'cover'">
                            <a-image :width="80" :src="record.cover[0]?.uid" />
                        </template>
                        <template v-else-if="column.dataIndex === 'tags'">
                            <div>{{ record.tags.join('/') }}</div>
                        </template>
                        <template v-else-if="column.dataIndex === 'status'">
                            <a-tag
                                :color="contentStatusOptions.find((item: any) => item.value == record.status)?.color">{{
                                    contentStatusOptions.find((item: any) => item.value == record.status)?.label}}</a-tag>
                        </template>
                        <template v-else-if="column.dataIndex === 'operations'">
                            <a-flex>
                                <a-popconfirm title="确定删除吗?" ok-text="是" cancel-text="否"
                                    @confirm="() => handleConfirmDelete([record.id], deleteUser)"
                                    :disabled="record.status">
                                    <a-button danger type="link" :disabled="record.status">删除</a-button>
                                </a-popconfirm>
                            </a-flex>
                        </template>
                    </template>
                </a-table>
            </a-flex>
        </a-card>
    </a-flex>
</template>

<script setup lang="ts">
import TableFilter from '@/components/Table/TableFilter.vue';
import { ref } from 'vue';
import { useTableSearch } from '@/composables/useTableSearch';
import { fetchGetRoleList, getDictItemByDictCode } from '@/api/system/role';
import { deleteRoles } from "@/api/system/role";
import { deleteUser, fetchUserStatus } from '@/api/system/user';
import { contentStatusOptions } from '@/utils/constant';


const {
    tableData,
    loading,
    handleSearch,
    resetSearch,
    filterState,
    handlePageChange,
    handleConfirmDelete,
    pagination,
    selectedRowKeys,
    handleSelectChange,
    handleStatusChange
} = useTableSearch({ url: `${import.meta.env.VITE_API_CONTENT_URL}/contents/search` })

const roleOptions = ref<any[]>([])

function getCheckboxProps(record: { [key: string]: any }) {
    return {
        disabled: record.roleCode == 'super_admin' || record.status == 1
    }
}

const queryColumns = ref([
    {
        title: "标题",
        key: "title",
        component: "a-input"
    },
    {
        title: "标签",
        key: "tags",
        component: "a-select",
        componentProps: {
            options: [
                {
                    label: '启用',
                    value: 1
                },
                {
                    label: '禁用',
                    value: 0
                }
            ]
        }
    }
])
const columns = [
    {
        title: '标题',
        dataIndex: 'title',
        width: 200
    },
    {
        title: '封面',
        dataIndex: 'cover',
        width: 100
    },
    {
        title: '标签',
        dataIndex: 'tags',
        width: 200
    },
    {
        title: '内容',
        dataIndex: 'content',
        width: 200
    },
    {
        title: '状态',
        dataIndex: 'status',
        width: 200
    },
    {
        title: '创建人',
        dataIndex: 'createdBy',
        width: 200
    },
    {
        title: '修改人',
        dataIndex: 'updatedBy',
        width: 200
    },
    {
        title: '创建时间',
        dataIndex: 'createdAt',
        width: 160
    },
    {
        title: '修改时间',
        dataIndex: 'updatedAt',
        width: 160
    },
    {
        title: '操作',
        dataIndex: 'operations',
        width: 160,
        fixed: 'right'
    }
]

getAllRoles()
async function getAllRoles() {
    const { records = [] } = await fetchGetRoleList({ page: 1, pageSize: 100, status: 1 })
    roleOptions.value = records
}

</script>

<style scoped lang="less"></style>
