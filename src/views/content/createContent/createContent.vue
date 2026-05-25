<template>
    <a-flex vertical gap="10">
        <a-card>
            <a-flex justify="space-between" align="center">
                <h3 style="margin: 0;">创建内容</h3>
                <a-space class="btns">
                    <a-button type="primary">保存草稿</a-button>
                    <a-button type="primary">提交审核</a-button>
                </a-space>
            </a-flex>
        </a-card>
        <a-card title="配置">
            <a-form :model="formState" ref="formRef" :rules="rules" layout="vertical">
                <a-row :gutter="16">
                    <a-col :span="24">
                        <a-form-item label="标题" name="title">
                            <a-input v-model:value="formState.title" placeholder="" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-item label="标签" name="tags">
                            <a-select v-model:value="formState.tags" placeholder="" :options="[]" allow-clear />
                        </a-form-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-item label="封面图" name="coverImage">

                        </a-form-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-item label="内容" name="content">
                            <markdown-editor />
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
        </a-card>
    </a-flex>

</template>

<script setup lang="ts">
import MarkdownEditor from '@/components/MarkdownEditor/MarkdownEditor.vue';
import { ref } from 'vue';

const rules = {
    tags: [
        { required: true, message: '请选择' }
    ],
    title: [
        { required: true, message: '请输入' }
    ],
    coverImage: [
        { required: true, message: '请上传' }
    ],
    content: [
        { required: true, message: '请输入' }
    ]
}

const formState = ref({
    tags: [],
    title: '',
    coverImage: '',
    content: ''

})
</script>

<style scoped lang="less"></style>
