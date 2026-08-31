<template>
    <a-drawer width="34%" title="账号设置" @close="() => handleVisible()" :destroy-on-close="true" :open="true">
        <a-form :model="formState" ref="formRef" :rules="rules" layout="vertical">
            <a-row :gutter="16">
                <a-col :span="24">
                    <a-form-item label="头像" name="avatar">
                        <UploadFile v-model:fileList="formState.avatar" />
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="昵称" name="nickname">
                        <a-input v-model:value="formState.nickname" placeholder="" />
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>
        <template #extra>
            <a-space>
                <a-button @click="() => handleVisible()">取消</a-button>
                <a-button type="primary" @click="handleSubmit()">提交</a-button>
            </a-space>
        </template>
    </a-drawer>
</template>

<script setup lang="ts">
import { message, type FormInstance } from 'ant-design-vue';
import { onMounted, ref, watch } from 'vue';
import UploadFile from '../Upload/UploadFile.vue';
import { useAuthStore, type AuthState } from '@/stores/useAuthStore.ts';
import { fetchEditUser } from '@/api/system/user.ts';

const info = useAuthStore().userInfo
const emit = defineEmits(['close', 'ok'])
const rules: {} = {
    avatar: [
        { required: true, message: '请上传' }
    ],
    nickname: [
        { required: true, message: '请输入' }
    ]
}
const formState = ref({
    avatar: [] as any[],
    nickname: '',
    id: null
})

onMounted(() => {
    formState.value = {
        avatar: info.avatar ? [{ uid: info.avatar, status: 'done', name: '' }] : [],
        nickname: info.nickname,
        id: info.id
    }
})


const formRef = ref<FormInstance | null>(null)

function handleVisible() {
    emit('close')
}

async function handleSubmit() {
    await formRef.value!.validate()
    await fetchEditUser({
        ...formState.value,
        avatar: formState.value.avatar[0].uid
    })
    message.success('编辑成功！')
    emit('ok')
    handleVisible()
}

</script>

<style scoped lang="less"></style>
