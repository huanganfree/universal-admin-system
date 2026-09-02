<template>
    <a-flex :gap="10" vertical>
        <a-card :bordered="false">
            <TableFilter :columns="queryColumns" v-model="filterState" @search="handleSearch" @reset="resetSearch" />
        </a-card>
        <a-card :bordered="false">
            <a-flex :gap="10" vertical>
                <a-space>
                    <a-button type="primary" @click="handleAdd">创建</a-button>
                </a-space>
                <a-table :columns="columns" :data-source="tableData" :rowKey="'id'" :loading="loading"
                    :pagination="pagination" @change="handlePageChange" :scroll="{ x: 2000 }">
                    <template #bodyCell="{ column, record }">
                        <template v-if="column.dataIndex === 'cover'">
                            <a-image :height="40" :src="getImageUrl(record.cover[0]?.uid)"
                                v-if="record.cover[0]?.uid" />
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
                                <a-button type="link" @click="() => handleEdit(record, 1)"
                                    v-permissions="'content:allContent:view'">查看</a-button>
                                <a-button type="link" v-if="!['published', 'pending'].includes(record.status)"
                                    @click="() => handleEdit(record, 0)"
                                    v-permissions="'content:allContent:edit'">编辑</a-button>
                                <a-popconfirm title="确定下线吗?" ok-text="是" cancel-text="否"
                                    @confirm="() => handleUnpublish({ id: record.id })"
                                    v-if="record.status == 'published'">
                                    <a-button type="link" v-permissions="'content:allContent:unpublish'">下线</a-button>
                                </a-popconfirm>
                                <a-button type="link" @click="() => handleSubmit(record)"
                                    v-if="record.status == 'draft' || record.status == 'offline'"
                                    v-permissions="'content:allContent:approve'">提交审核</a-button>
                                <a-popconfirm title="确定删除吗?" ok-text="是" cancel-text="否"
                                    @confirm="() => handleConfirmDelete([record.id], fetchDeleteContent)">
                                    <a-button danger type="link"
                                        v-permissions="'content:allContent:delete'">删除</a-button>
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
import { contentStatusNotPendingOptions, contentStatusOptions } from '@/utils/constant';
import ShowMarkdown from '@/components/ShowMarkdown/ShowMarkdown.vue';
import { fetchDeleteContent, fetchSubmitContent, fetchUnpublishContent } from '@/api/content/content';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { getImageUrl } from '@/utils/image';

const router = useRouter()

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


function handleAdd() {
    router.push(`/content/createContent`)
}

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
    // {
    //     title: '内容',
    //     dataIndex: 'content',
    //     width: 150
    // },
    {
        title: '驳回原因',
        dataIndex: 'reviewRemark',
        width: 150
    },
    {
        title: '创建人',
        dataIndex: 'creatorName',
        width: 100
    },
    {
        title: '修改人',
        dataIndex: 'updaterName',
        width: 100
    },
    {
        title: '创建时间',
        dataIndex: 'createdAt',
        width: 130,
    },
    {
        title: '修改时间',
        dataIndex: 'updatedAt',
        width: 130,
    },
    {
        title: '状态',
        dataIndex: 'status',
        width: 60,
        fixed: 'right'
    },
    {
        title: '操作',
        dataIndex: 'operations',
        width: 201,
        fixed: 'right'
    }
]

function handleEdit(params: any, type: number) {
    router.push(`/content/createContent?id=${params?.id}&isView=${type}`)
}

async function handleSubmit({ id }: { id: string | number }) {
    await fetchSubmitContent({ id })
    message.success('提交审核成功！')
    handleSearch()
}

async function handleUnpublish(data: any) {
    await fetchUnpublishContent(data)
    message.success('下线成功！')
    handleSearch()
}

</script>

<style scoped lang="less"></style>
