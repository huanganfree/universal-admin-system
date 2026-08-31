<template>
    <a-flex :gap="10" vertical>
        <a-card :bordered="false">
            <TableFilter :columns="queryColumns" v-model="filterState" @search="handleSearch" @reset="resetSearch" />
        </a-card>
        <a-card :bordered="false">
            <a-flex :gap="10" vertical>
                <a-space>
                    <AddUser @ok="handleSearch" :role-options="roleOptions" />
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
                            <a-switch v-model:checked="record.status" :checkedValue="true" :unCheckedValue="false"
                                checked-children="启用" un-checked-children="禁用"
                                :disabled="record.roleCode == 'super_admin'"
                                @change="(value: number) => handleStatusChange(value, record, fetchUserStatus)" />
                        </template>
                        <template v-else-if="column.dataIndex === 'avatar'">
                            <a-image :width="'100%'" :src="record.avatar" v-if="record.avatar"
                                style="border-radius: 10px;" />
                            <div class="default-avatar" v-else></div>
                        </template>
                        <template v-else-if="column.dataIndex === 'operations'">
                            <a-flex>
                                <AddUser @ok="handleSearch" :outFormData="record" :role-options="roleOptions" />
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
import AddUser from './config/addUser.vue';
import { useTableSearch } from '@/composables/useTableSearch';
import { fetchGetRoleList, getDictItemByDictCode } from '@/api/system/role';
import { deleteRoles } from "@/api/system/role";
import { deleteUser, fetchUserStatus } from '@/api/system/user';

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
} = useTableSearch({ url: `${import.meta.env.VITE_API_SYSTEM_URL}/users/search` })

const roleOptions = ref<any[]>([])

function getCheckboxProps(record: { [key: string]: any }) {
    return {
        disabled: record.roleCode == 'super_admin' || record.status == 1
    }
}

const queryColumns = ref([
    {
        title: "用户名",
        key: "username",
        component: "a-input"
    },
    {
        title: "手机号",
        key: "phone",
        component: "a-input",
        componentProps: {
            maxlength: 11
        }
    },
    {
        title: "状态",
        key: "status",
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
        title: '用户名',
        dataIndex: 'username',
        width: 120
    },
    {
        title: '头像',
        dataIndex: 'avatar',
        ellipsis: true,
        width: 96
    },
    {
        title: '手机号',
        dataIndex: 'phone',
        width: 160
    },
    {
        title: '昵称',
        dataIndex: 'nickname',
        width: 120
    },
    {
        title: '角色',
        dataIndex: 'roleName',
        ellipsis: true
    },
    {
        title: '最近登录时间',
        dataIndex: 'lastLoginTime',
        width: 160
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
        width: 90
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

<style scoped lang="less">
.default-avatar {
    width: 60px;
    height: 60px;
    border-radius: 10px;
    background-color: #c6c6c6;
}
</style>
