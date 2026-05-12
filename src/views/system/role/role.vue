<template>
    <a-flex :gap="10" vertical>
        <a-card :bordered="false">
            <TableFilter :columns="queryColumns" v-model="filterState" @search="handleSearch" @reset="resetSearch" />
        </a-card>
        <a-card :bordered="false">
            <a-flex :gap="10" vertical>
                <AddRole />
                <a-table :columns="columns" :data-source="tableData" :loading="loading" :pagination="pagination"
                    @change="handlePageChange"></a-table>
            </a-flex>
        </a-card>
    </a-flex>
</template>

<script setup lang="ts">
import TableFilter from '@/components/Table/TableFilter.vue';
import { onMounted, ref } from 'vue';
import AddRole from './config/addRole.vue';
import { useTableSearch } from '@/composables/useTableSearch';

const {
    tableData,
    loading,
    handleSearch,
    resetSearch,
    filterState,
    handlePageChange,
    pagination
} = useTableSearch({ url: `${import.meta.env.VITE_API_SYSTEM_URL}/roles/search` })

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
        dataIndex: 'description'
    },
    {
        title: '状态',
        dataIndex: 'status'
    }
]

</script>

<style scoped lang="less"></style>
