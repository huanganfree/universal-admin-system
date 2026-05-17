<template>
    <a-flex :gap="10" vertical>
        <a-card :bordered="false">
            <TableFilter :columns="queryColumns" v-model="filterState" @search="handleSearch" @reset="resetSearch" />
        </a-card>
        <a-card :bordered="false">
            <a-flex :gap="10" vertical>
                <a-space>
                    <AddRole @ok="handleSearch" :role-dict-item="roleDictItem" />
                    <a-popconfirm title="确定删除吗?" ok-text="是" cancel-text="否"
                        @confirm="() => handleConfirmDelete(selectedRowKeys, deleteRoles)"
                        :disabled="!selectedRowKeys.length">
                        <a-button danger :disabled="!selectedRowKeys.length">删除</a-button>
                    </a-popconfirm>
                </a-space>
                <a-table :columns="columns"
                    :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: handleSelectChange, getCheckboxProps }"
                    :data-source="tableData" :rowKey="'id'" :loading="loading" :pagination="pagination"
                    @change="handlePageChange">
                    <template #bodyCell="{ column, record }">
                        <template v-if="column.dataIndex === 'status'">
                            <a-switch v-model:checked="record.status" :checkedValue="1" :unCheckedValue="0"
                                checked-children="启用" un-checked-children="禁用"
                                :disabled="record.roleCode == 'super_admin'"
                                @change="(value: number) => handleStatusChange(value, record)" />
                        </template>
                        <template v-if="column.dataIndex === 'operations'">
                            <a-flex>
                                <AddRole @ok="handleSearch" :outFormData="record" :role-dict-item="roleDictItem" />
                                <AuthConfig :outFormData="record" />
                                <a-popconfirm title="确定删除吗?" ok-text="是" cancel-text="否"
                                    @confirm="() => handleConfirmDelete([record.id], deleteRoles)"
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
import AddRole from './config/addRole.vue';
import { useTableSearch } from '@/composables/useTableSearch';
import { getDictItemByDictCode } from '@/api/system/role';
import { deleteRoles } from "@/api/system/role";
import AuthConfig from './config/authConfig.vue';

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
} = useTableSearch({ url: `${import.meta.env.VITE_API_SYSTEM_URL}/roles/search` })

const roleDictItem = ref<any[]>([])

function getCheckboxProps(record: { [key: string]: any }) {
    return {
        disabled: record.roleCode == 'super_admin' || record.status == 1
    }
}

const queryColumns = ref([
    {
        title: "角色名称",
        key: "roleName",
        component: "a-input"
    }
])
const columns = [
    {
        title: '角色名称',
        dataIndex: 'roleName'
    },
    {
        title: '角色标识',
        dataIndex: 'roleCode'
    },
    {
        title: '角色描述',
        dataIndex: 'description',
        ellipsis: true
    },
    {
        title: '状态',
        dataIndex: 'status'
    },
    {
        title: '操作',
        dataIndex: 'operations'
    }
]

getDictItemsByRole()
async function getDictItemsByRole() {
    const res = await getDictItemByDictCode({ dictCode: 'role_code' })
    roleDictItem.value = res.map((item: any) => ({
        label: `${item.item_value}(${item.item_text})`,
        value: item.item_value
    }))
}

</script>

<style scoped lang="less"></style>
