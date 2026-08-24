<template>
    <a-flex vertical gap="10">
        <a-card>
            <a-flex justify="space-between" align="center">
                <h3 style="margin: 0;">创建/编辑内容</h3>
                <a-space class="btns">
                    <a-button @click="router.back()">返回</a-button>
                    <a-button type="primary" @click="handleSaveDraft" :disabled="isDisabled">保存草稿</a-button>
                    <a-button type="primary" @click="handleSaveCheck" :disabled="isDisabled">提交审核</a-button>
                </a-space>
            </a-flex>
        </a-card>
        <a-card title="配置">
            <a-form :model="formState" ref="formRef" :rules="rules" layout="vertical" :disabled="isDisabled">
                <a-row :gutter="16">
                    <a-col :span="24">
                        <a-form-item label="标题" name="title">
                            <a-input v-model:value="formState.title" placeholder="" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-item label="标签" name="tags">
                            <a-select v-model:value="formState.tags" placeholder="" :options="[]" allow-clear
                                mode="tags" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-item label="封面图" name="coverImage">
                            <upload-file v-model:fileList="formState.coverImage" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-item label="内容" name="content">
                            <markdown-editor v-model:content="formState.content" :disabled="isDisabled" />
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
        </a-card>
    </a-flex>

</template>

<script setup lang="ts">
import { fetchContentDetail, fetchCreateContent, fetchEditContent } from '@/api/content/content';
import MarkdownEditor from '@/components/MarkdownEditor/MarkdownEditor.vue';
import UploadFile from '@/components/Upload/UploadFile.vue';
import { message } from 'ant-design-vue';
import { computed, onBeforeMount, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const { id, isView = '0' } = useRoute().query || { isView: '0' }

const isDisabled = computed(() => {
    return parseFloat(isView as (string)) === 1
})

const formRef = ref<import('ant-design-vue').FormInstance | null>(null)
const rules = {
    tags: [
        { required: true, message: '请选择' }
    ],
    title: [
        { required: true, message: '请输入' }
    ],
    coverImage: [
        { required: false, message: '请上传' }
    ],
    content: [
        { required: true, message: '请输入' }
    ]
}

const formState = ref<{ [key: string]: any }>({
    tags: [],
    title: '',
    coverImage: [],
    content: ''
})

onBeforeMount(() => {
    if (id)
        initData()
})

async function initData() {
    const res = await fetchContentDetail(id as string)
    formState.value = {
        ...res,
        coverImage: res.cover
    }
}

// 保存草稿
async function handleSaveDraft() {
    await formRef.value!.validate()
    const { coverImage, ...leftProps } = formState.value
    if (!leftProps.id) {
        await fetchCreateContent({
            ...leftProps,
            cover: coverImage,
            status: 'draft'
        })
    } else {
        await fetchEditContent({
            ...leftProps,
            cover: coverImage,
            status: 'draft'
        })
    }
    message.success('保存草稿成功！')
    router.push('/content/allContent')
}

async function handleSaveCheck() {
    await formRef.value!.validate()
    const { coverImage, ...leftProps } = formState.value
    await fetchCreateContent({
        ...leftProps,
        cover: coverImage,
        status: 'pending'
    })
    message.success('提交审核成功！')
    router.push('/content/pendingReview')
}
</script>

<style scoped lang="less"></style>
