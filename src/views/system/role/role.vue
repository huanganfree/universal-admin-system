<template>
    <a-flex :gap="10" vertical>
        <a-card :bordered="false">
            <TableFilter :columns="queryColumns" v-model="filterState" />
        </a-card>
        <a-card :bordered="false">
            <a-flex :gap="10" vertical>
                <AddRole />
                <a-table :columns="columns" :data-source="tableData"></a-table>
            </a-flex>
        </a-card>
    </a-flex>
</template>

<script setup lang="ts">
import TableFilter from '@/components/Table/TableFilter.vue';
import { ref } from 'vue';
import AddRole from './config/addRole.vue';

const filterState = ref({})
const queryColumns = ref([
    {
        title: "角色名称",
        key: "roleName",
        component: "a-input"
    },
    {
        title: "角色标识",
        key: "roleCode",
        component: "a-input"
    }
])
const tableData = ref([])
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

<style scoped lang="less">
.menu {
    // 样式代码
}
</style>
