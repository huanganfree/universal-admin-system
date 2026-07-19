<template>
    <a-flex :gap="10" vertical>
        <a-card :bordered="false">
            <TableFilter :columns="queryColumns" v-model="filterState" @search="handleSearch" @reset="resetSearch" />
        </a-card>
        <a-card :bordered="false">
            <a-flex :gap="10" vertical>
                <a-space>
                    <AddMenu @ok="handleSearch" />
                    <a-popconfirm title="确定删除吗?" ok-text="是" cancel-text="否"
                        @confirm="() => handleConfirmDelete(selectedRowKeys, deleteRoles)"
                        :disabled="!selectedRowKeys.length">
                        <a-button danger :disabled="!selectedRowKeys.length">删除</a-button>
                    </a-popconfirm>
                </a-space>
                <a-table :columns="columns"
                    :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: handleSelectChange, getCheckboxProps }"
                    :data-source="tableData" :rowKey="'id'" :loading="loading" :pagination="false"
                    @change="handlePageChange" :scroll="{ x: 1400 }">
                    <template #bodyCell="{ column, record }">
                        <template v-if="column.dataIndex === 'status'">
                            <a-switch v-model:checked="record.status" :checkedValue="1" :unCheckedValue="0"
                                checked-children="启用" un-checked-children="禁用"
                                :disabled="record.roleCode == 'super_admin'"
                                @change="(value: number) => handleStatusChange(value, record, updateMenuStatus)" />
                        </template>
                        <template v-else-if="column.dataIndex === 'type'">
                            <a-tag :color="record.type == 1 ? 'green' : 'orange'">{{menuTypeOptions.find((item: any) =>
                                item.value == record.type)?.label}}</a-tag>
                        </template>
                        <template v-else-if="column.dataIndex === 'operations'">
                            <a-flex>
                                <AddMenu @ok="handleSearch" :parent-id="record.id" :parent-name="record.name"
                                    v-if="record.type == 1" />
                                <AddMenu @ok="handleSearch" :outFormData="record" />
                                <a-popconfirm title="确定删除吗?" ok-text="是" cancel-text="否"
                                    @confirm="() => handleConfirmDelete([record.id], fetchDeleteMenus)"
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
import AddMenu from './config/addMenu.vue';
import { useTableSearch } from '@/composables/useTableSearch';
import { deleteRoles } from "@/api/system/role";
import { menuTypeOptions } from '@/utils/constant.ts';
import { flatToTree } from '@/utils/utilFunc.ts';
import { fetchDeleteMenus, updateMenuStatus } from '@/api/system/menu.ts';

const {
    tableData,
    loading,
    handleSearch,
    resetSearch,
    filterState,
    handlePageChange,
    handleConfirmDelete,
    selectedRowKeys,
    handleSelectChange,
    handleStatusChange
} = useTableSearch({ url: `${import.meta.env.VITE_API_SYSTEM_URL}/menu/search`, isAll: true, transformData })


function getCheckboxProps(record: { [key: string]: any }) {
    return {
        disabled: record.roleCode == 'super_admin' || record.status == 1
    }
}

function transformData(params: any[]) {
    const res = flatToTree([...params])
    console.log('res==', res);
    return res
}

const queryColumns = ref([
    {
        title: "菜单名称",
        key: "name",
        component: "a-input"
    },
    {
        title: "状态",
        key: "status",
        component: "a-select",
        componentProps: {
            options: [
                {
                    label: '启用',
                    value: '1'
                },
                {
                    label: '禁用',
                    value: '0'
                }
            ]
        }
    }
])
const columns = [
    {
        title: '菜单名称',
        dataIndex: 'name',
        width: 160
    },
    {
        title: '类型',
        dataIndex: 'type',
        width: 120
    },
    {
        title: '图标',
        dataIndex: 'icon',
        width: 180
    },
    {
        title: '菜单路由',
        dataIndex: 'path',
        width: 160,
        ellipsis: true
    },
    {
        title: '组件路径',
        dataIndex: 'component',
        width: 160,
        ellipsis: true
    },
    {
        title: '权限标识',
        dataIndex: 'permission',
        width: 160,
        ellipsis: true
    },
    {
        title: '排序',
        dataIndex: 'sort',
        width: 70
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
        title: '状态',
        dataIndex: 'status',
        fixed: 'right',
        width: 100
    },
    {
        title: '操作',
        dataIndex: 'operations',
        fixed: 'right',
        width: 220
    }
]

</script>

<style scoped lang="less"></style>
