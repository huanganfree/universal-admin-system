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
                    :pagination="pagination" @change="handlePageChange" :scroll="{ x: 2000 }">
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
                                <a-button type="link">查看</a-button>
                                <a-button type="link">编辑</a-button>
                                <a-button type="link" v-if="record.status == 'published'">下线</a-button>
                                <a-button type="link" @click="() => handleSubmit(record)"
                                    v-if="record.status == 'draft'">提交审核</a-button>
                                <a-popconfirm title="确定删除吗?" ok-text="是" cancel-text="否"
                                    @confirm="() => handleConfirmDelete(record.id, fetchDeleteContent)">
                                    <a-button danger type="link">删除</a-button>
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
import { deleteUser, fetchUserStatus } from '@/api/system/user';
import { contentStatusNotPendingOptions, contentStatusOptions } from '@/utils/constant';
import ShowMarkdown from '@/components/ShowMarkdown/ShowMarkdown.vue';
import { fetchDeleteContent, fetchSubmitContent } from '@/api/content/content';
import { message } from 'ant-design-vue';

const {
    tableData,
    loading,
    handleSearch,
    resetSearch,
    filterState,
    handlePageChange,
    handleConfirmDelete,
    pagination,
} = useTableSearch({ url: `${import.meta.env.VITE_API_CONTENT_URL}/contents/search`, transformParams })

function transformParams(params: any) {
    const { status, ...leftProps } = params
    if (status) {
        return {
            ...leftProps,
            status: status.join(',')
        }
    }

    return params
}

const queryColumns = ref([
    {
        title: "标题",
        key: "title",
        component: "a-input"
    },
    {
        title: "状态",
        key: "status",
        component: "a-select",
        componentProps: {
            options: contentStatusNotPendingOptions,
            mode: 'multiple'
        }
    }
])
const columns = [
    {
        title: '标题',
        dataIndex: 'title',
        width: 150
    },
    {
        title: '封面',
        dataIndex: 'cover',
        width: 100
    },
    {
        title: '标签',
        dataIndex: 'tags',
        width: 140
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
        title: '驳回备注',
        dataIndex: 'reviewRemark',
        width: 160
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
        width: 234,
        fixed: 'right'
    }
]
async function handleSubmit({ id }: { id: string | number }) {
    await fetchSubmitContent({ id })
    message.success('提交审核成功！')
    handleSearch()
}

</script>

<style scoped lang="less"></style>
