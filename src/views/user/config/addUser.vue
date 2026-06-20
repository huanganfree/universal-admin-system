<template>
    <div class="component-name">
        <a-button type="primary" @click="() => handleVisible(true)" v-if="!outFormData.id">新增</a-button>
        <a-button type="link" v-else @click="() => handleVisible(true)" :disabled="outFormData.status">编辑</a-button>
        <a-drawer width="40%" :title="title" @close="() => handleVisible(false)" :destroy-on-close="true"
            v-model:open="visible">
            <a-form :model="formState" ref="formRef" :rules="rules" layout="vertical">
                <a-row :gutter="16">
                    <a-col :span="24">
                        <a-form-item label="用户名" name="username">
                            <a-input v-model:value="formState.username" placeholder="" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-item label="手机号" name="phone">
                            <a-input v-model:value="formState.phone" placeholder="" allow-clear :maxlength="11"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-item label="昵称" name="nickname">
                            <a-input v-model:value="formState.nickname" placeholder="" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-item label="角色" name="roleId">
                            <a-select v-model:value="formState.roleId" placeholder="" :options="roleOptions" allow-clear
                                :field-names="{ label: 'roleName', value: 'id' }" />
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
import { fetchAddUser, fetchEditUser } from '@/api/system/user';
import { message, type FormInstance } from 'ant-design-vue';
import { ref, watch } from 'vue';

interface UserFormData {
  username: string
  roleId: number | undefined
  nickname: string
  phone: string
  id?: number
  status?: boolean  // 模板里用到了 outFormData.status
}

const props = withDefaults(
    defineProps<{
        outFormData?: UserFormData, // 或你真实的角色类型
        roleOptions?: { [key: string]: unknown }[]
    }>(),
    { outFormData: () => ({ username: '', roleId: undefined, nickname: '', phone: '' }) }
)

const rules: {} = {
    username: [
        { required: true, message: '请输入' }
    ],
    roleId: [
        { required: true, message: '请选择' }
    ],
    nickname: [
        { required: true, message: '请输入' }
    ],
    phone: [
        { required: true, message: '请输入' }
    ]
}
const emit = defineEmits(['ok'])
const formState = ref<UserFormData>({
    username: '',
    roleId: undefined,
    nickname: '',
    phone: ''
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
        await fetchAddUser(formState.value)
        message.success('新增成功！')
    } else {
        await fetchEditUser(formState.value)
        message.success('编辑成功！')
    }
    emit('ok')
    handleVisible(false)
}



</script>

<style scoped lang="less"></style>
