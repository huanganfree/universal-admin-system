<template>
    <div class="component-name">
        <a-button type="link" danger @click="visible = true">驳回</a-button>
        <a-drawer width="36%" :title="title" @close="() => handleVisible(false)" :destroy-on-close="true"
            v-model:open="visible">
            <a-form :model="formState" ref="formRef" :rules="rules" layout="vertical">
                <a-row :gutter="16">
                    <a-col :span="24">
                        <a-form-item label="备注" name="remark">
                            <a-textarea v-model:value="formState.remark" placeholder="" />
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
import { fetchRejectContent } from '@/api/content/content';
import { fetchAddUser, fetchEditUser } from '@/api/system/user';
import { message, type FormInstance } from 'ant-design-vue';
import { ref, watch } from 'vue';

interface UserFormData {
    remark: string;
    id: string | number
}

const props = withDefaults(
    defineProps<{
        outFormData?: UserFormData, // 或你真实的角色类型
    }>(),
    { outFormData: () => ({ remark: '', id: '' }) }
)

const rules: {} = {
    remark: [
        { required: true, message: '请输入' }
    ]
}
const emit = defineEmits(['ok'])
const formState = ref<UserFormData>({
    remark: '',
    id: ''
})

watch(() => props.outFormData, () => {
    formState.value = { ...props.outFormData }
}, { immediate: true })
const title = ref('驳回')
const visible = ref(false)
const formRef = ref<FormInstance | null>(null)

function handleVisible(show: boolean) {
    visible.value = show
    if (!show)
        formRef.value?.resetFields()
}
async function handleSubmit() {
    await formRef.value!.validate()
    const params = {
        remark: formState.value.remark,
        id: formState.value.id
    }
    await fetchRejectContent(params)
    message.success('驳回成功！')
    emit('ok')
    handleVisible(false)
}

</script>

<style scoped lang="less"></style>
