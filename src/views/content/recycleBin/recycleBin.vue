<template>
    <a-flex :gap="10" vertical>
        <a-card :bordered="false">
            <TableFilter :columns="queryColumns" v-model="filterState" @search="handleSearch" @reset="resetSearch" />
        </a-card>
        <a-card :bordered="false">
            <a-flex :gap="10" vertical>
                <a-space>
                    <a-popconfirm title="确定彻底删除吗?" ok-text="是" :disabled="!selectedRowKeys.length" cancel-text="否"
                        @confirm="() => handleConfirmDelete()">
                        <a-button danger type="primary" :disabled="!selectedRowKeys.length">彻底删除</a-button>
                    </a-popconfirm>
                </a-space>
                <a-table :columns="columns" :data-source="tableData" :rowKey="'id'" :loading="loading"
                    :pagination="pagination" @change="handlePageChange" :scroll="{ x: 1300 }"
                    :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }">
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
                                <a-popconfirm title="确定恢复吗?" @confirm="() => handleConfirmRestore(record.id)"
                                    ok-text="是" cancel-text="否">
                                    <a-button type="link">恢复</a-button>
                                </a-popconfirm>
                                <a-popconfirm title="确定彻底删除吗?" ok-text="是" cancel-text="否"
                                    @confirm="() => handleConfirmDelete([record.id])">
                                    <a-button danger type="link">彻底删除</a-button>
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
import { contentStatusOptions } from '@/utils/constant';
import ShowMarkdown from '@/components/ShowMarkdown/ShowMarkdown.vue';
import { fetchPhysicalDeleteContent, fetchRestoreContent } from '@/api/content/content';
import { message } from 'ant-design-vue';

const {
    tableData,
    loading,
    handleSearch,
    resetSearch,
    filterState,
    handlePageChange,
    pagination,
} = useTableSearch({ url: `${import.meta.env.VITE_API_CONTENT_URL}/deletedContents/search` })

const selectedRowKeys = ref<any[]>([])
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
    // {
    //     title: '内容',
    //     dataIndex: 'content',
    //     width: 170
    // },
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
        width: 160,
    },
    {
        title: '删除时间',
        dataIndex: 'deletedAt',
        width: 160,
    },
    {
        title: '操作',
        dataIndex: 'operations',
        width: 180,
        fixed: 'right'
    }
]

const onSelectChange = (selectedKeys: any[]) => {
    selectedRowKeys.value = selectedKeys;
};

async function handleConfirmRestore(id: any) {
    await fetchRestoreContent(id)
    message.success('恢复成功！')
    handleSearch()
}

async function handleConfirmDelete(ids?: any[]) {
    const idsArr = ids || selectedRowKeys.value
    await fetchPhysicalDeleteContent(idsArr)
    message.success('删除成功！')
    handleSearch()
}

</script>

<style scoped lang="less"></style>
