<template>
    <a-card :bordered="false">
        <a-flex :gap="10" vertical>
            <TableFilter :columns="queryColumns" v-model="filterState" />
        </a-flex>
    </a-card>
</template>

<script setup lang="ts">
import TableFilter from '@/components/Table/TableFilter.vue';
import { ref } from 'vue';

const filterState = ref({})
const queryColumns = ref([
    {
        title: "菜单名称",
        key: "subjectId",
        component: "a-input"
    }])
</script>

<style scoped lang="less">
.menu {
    // 样式代码
}
</style>
