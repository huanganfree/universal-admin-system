<template>
    <div class="component-name">
        <a-button type="primary" @click="() => handleVisible(true)">新增</a-button>
        <a-drawer width="40%" :title="title" @close="() => handleVisible(false)" :destroy-on-close="true"
            v-model:open="visible">
            <a-form :model="formState" ref="formRef" :rules="rules" layout="vertical">
                <a-row :gutter="16">
                    <a-col :span="24">
                        <a-form-item label="角色名称" name="roleName">
                            <a-input v-model:value="formState.roleName" placeholder="请输入" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-item label="角色标识" name="roleCode">
                            <a-input v-model:value="formState.roleCode" placeholder="请输入" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-item label="角色描述" name="description">
                            <a-textarea v-model:value="formState.description" placeholder="请输入" />
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
            <template #extra>
                <a-space>
                    <a-button @click="() => handleVisible(false)">取消</a-button>
                    <a-button type="primary" @click="handleSubmit()">提交</a-button>
                </a-space>
            </template>
        </a-drawer>
    </div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'ant-design-vue';
import { ref } from 'vue';

const rules: {} = {
    roleName: [
        { required: true, message: '请输入' }
    ],
    roleCode: [
        { required: true, message: '请输入' }
    ],
    description: [
        { required: false, message: '请输入' }
    ]
}
const formState = ref<{ [key: string]: unknown }>({
    roleName: '',
    roleCode: ''
})
const title = ref('新增角色')
const visible = ref(false)
const formRef = ref<FormInstance | null>(null)

function handleVisible(show: boolean) {
    visible.value = show
    if (!show)
        formRef.value?.resetFields()
}
async function handleSubmit() {
    await formRef.value!.validate()
}
</script>

<style scoped lang="less"></style>
