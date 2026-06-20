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
                    :pagination="pagination" @change="handlePageChange" :scroll="{ x: 1300 }">
                    <template #bodyCell="{ column, record }">
                        <template v-if="column.dataIndex === 'cover'">
                            <a-image :height="40" :src="record.cover[0]?.uid" v-if="record.cover[0]?.uid" />
                        </template>
                        <template v-else-if="column.dataIndex === 'tags'">
                            <div>{{ record.tags.join('/') }}</div>
                        </template>
                        <template v-else-if="column.dataIndex === 'content'">
                            <ShowMarkdown :content="record.content" />
                        </template>
                        <template v-else-if="column.dataIndex === 'status'">
                            <a-tag
                                :color="contentStatusOptions.find((item: any) => item.value == record.status)?.color">{{
                                    contentStatusOptions.find((item: any) => item.value == record.status)?.label}}</a-tag>
                        </template>
                        <template v-else-if="column.dataIndex === 'operations'">
                            <a-flex>
                                <a-button type="link" @click="handlePublish(record)">通过</a-button>
                                <RejectDrawer :out-form-data="record" @ok="handleSearch" />
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
import { handleError, ref } from 'vue';
import { useTableSearch } from '@/composables/useTableSearch';
import { fetchGetRoleList, getDictItemByDictCode } from '@/api/system/role';
import { contentStatusOptions } from '@/utils/constant';
import ShowMarkdown from '@/components/ShowMarkdown/ShowMarkdown.vue';
import { fetchPublisthContent, fetchSubmitContent } from '@/api/content/content';
import { message } from 'ant-design-vue';
import RejectDrawer from './components/rejectDrawer.vue';

const {
    tableData,
    loading,
    handleSearch,
    resetSearch,
    filterState,
    handlePageChange,
    pagination,
} = useTableSearch({ url: `${import.meta.env.VITE_API_CONTENT_URL}/pendingContents/search` })

const queryColumns = ref([
    {
        title: "标题",
        key: "title",
        component: "a-input"
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
        width: 170
    },
    {
        title: '状态',
        dataIndex: 'status',
        width: 100
    },
    {
        title: '创建人',
        dataIndex: 'creatorName',
        width: 120
    },
    {
        title: '修改人',
        dataIndex: 'updaterName',
        width: 120
    },
    {
        title: '创建时间',
        dataIndex: 'createdAt',
        width: 150,
    },
    {
        title: '修改时间',
        dataIndex: 'updatedAt',
        width: 150,
    },
    {
        title: '操作',
        dataIndex: 'operations',
        width: 150,
        fixed: 'right'
    }
]

async function handlePublish({ id }: { id: string | number }) {
    await fetchPublisthContent({ id })
    message.success('审核通过！')
    handleSearch()
}

</script>

<style scoped lang="less"></style>
