<template>
    <div class="component-name">
        <a-button type="primary" @click="() => handleVisible(true)" v-if="!outFormData.id">新增</a-button>
        <a-button type="link" v-else @click="() => handleVisible(true)" :disabled="outFormData.status">编辑</a-button>
        <a-drawer width="40%" :title="title" @close="() => handleVisible(false)" :destroy-on-close="true"
            v-model:open="visible">
            <a-form :model="formState" ref="formRef" :rules="rules" layout="vertical">
                <a-row :gutter="16">
                    <a-col :span="24">
                        <a-form-item label="角色名称" name="roleName">
                            <a-input v-model:value="formState.roleName" placeholder="" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-item label="角色标识" name="roleCode">
                            <a-select v-model:value="formState.roleCode" placeholder="" :options="roleDictItem"
                                allow-clear />
                        </a-form-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-item label="角色描述" name="description">
                            <a-textarea v-model:value="formState.description" placeholder="" />
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
import { addRole, editRole, getDictItemByDictCode } from '@/api/system/role';
import { message, type FormInstance } from 'ant-design-vue';
import { ref, watch } from 'vue';

const props = withDefaults(
    defineProps<{
        outFormData?: { [key: string]: unknown }, // 或你真实的角色类型
        roleDictItem?: { [key: string]: unknown }[]
    }>(),
    { outFormData: () => ({ roleName: '', roleCode: undefined, description: '' }) }
)

const rules: {} = {
    roleName: [
        { required: true, message: '请输入' }
    ],
    roleCode: [
        { required: true, message: '请选择' }
    ],
    description: [
        { required: false, message: '请输入' }
    ]
}
const emit = defineEmits(['ok'])
const formState = ref<{ [key: string]: any }>({
    roleName: '',
    roleCode: undefined,
    description: ''
})

watch(() => props.outFormData, () => {
    formState.value = { ...props.outFormData }
}, { immediate: true })
const title = ref('新增角色')
const visible = ref(false)
const formRef = ref<FormInstance | null>(null)

function handleVisible(show: boolean) {
    visible.value = show
    if (props.outFormData.id) {
        title.value = '编辑角色'
    }
    if (!show)
        formRef.value?.resetFields()
}
async function handleSubmit() {
    await formRef.value!.validate()
    if (!formState.value.id) {
        await addRole(formState.value as { roleName: string, roleCode: string, description?: string })
        message.success('新增成功！')
    } else {
        await editRole(formState.value)
        message.success('编辑成功！')
    }
    emit('ok')
    handleVisible(false)
}



</script>

<style scoped lang="less"></style>
