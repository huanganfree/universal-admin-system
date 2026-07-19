<template>
    <div class="component-name">
        <a-button type="primary" @click="() => handleVisible(true)" v-if="!outFormData?.id && !parentId">新增</a-button>
        <a-button type="link" @click="() => handleVisible(true)" v-else-if="parentId">新增</a-button>
        <a-button type="link" @click="() => handleVisible(true)" v-else :disabled="outFormData?.status">编辑</a-button>
        <a-drawer width="40%" :title="title" @close="() => handleVisible(false)" :destroy-on-close="true"
            v-model:open="visible">
            <a-form :model="formState" ref="formRef" :rules="rules" layout="vertical">
                <a-row :gutter="16">
                    <a-col :span="24">
                        <a-form-item label="父级菜单" name="parentName">
                            <a-input v-model:value="localParentName" placeholder="" disabled />
                        </a-form-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-item label="菜单名称" name="name">
                            <a-input v-model:value="formState.name" placeholder="" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-item label="类型" name="type">
                            <a-select v-model:value="formState.type" placeholder="" :options="menuTypeOptions" />
                        </a-form-item>
                    </a-col>
                    <template v-if="formState.type == '1'">
                        <a-col :span="24">
                            <a-form-item label="菜单路由" name="path">
                                <a-input v-model:value="formState.path" placeholder="" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="24">
                            <a-form-item label="组件路径" name="component">
                                <a-input v-model:value="formState.component" placeholder="" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="24">
                            <a-form-item label="图标" name="icon">
                                <a-input v-model:value="formState.icon" placeholder="" />
                            </a-form-item>
                        </a-col>
                    </template>
                    <a-col :span="24" v-if="formState.type == '2'">
                        <a-form-item label="权限标识" name="permission">
                            <a-input v-model:value="formState.permission" placeholder="" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-item label="排序" name="sort">
                            <a-input-number v-model:value="formState.sort" placeholder="" style="width: 100%;" />
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
import { addMenu, editMenu, type MenuParamsType } from '@/api/system/menu';
import { menuTypeOptions } from '@/utils/constant';
import { message, type FormInstance } from 'ant-design-vue';
import { ref, watch } from 'vue';


const props = withDefaults(
    defineProps<{
        outFormData?: MenuParamsType, // 或你真实的角色类型
        parentId?: number | string,
        parentName?: string
    }>(),
    {}
)

const rules: {} = {
    name: [
        { required: true, message: '请输入' }
    ],
    type: [
        { required: true, message: '请选择' }
    ],
    path: [
        { required: true, message: '请输入' }
    ],
    component: [
        { required: false, message: '请输入' }
    ],
    icon: [
        { required: true, message: '请输入' }
    ],
    permission: [
        { required: true, message: '请输入' }
    ]
}
const emit = defineEmits(['ok'])
const formState = ref<MenuParamsType>({
    type: '1',
    name: '',
})
const localParentName = ref('')

watch(() => props.outFormData, (val) => {
    if (val) {
        formState.value = { ...val }
        if (!formState.value.type) {
            formState.value.type = '1'
        }
    }
}, { immediate: true })

watch(() => props.parentId, (val) => {
    if (val) {
        localParentName.value = props.parentName!
        formState.value = { parentId: val, type: '1' }
        if (!formState.value.type) {
            formState.value.type = '1'
        }
    }
}, { immediate: true })

const title = ref('新增菜单')
const visible = ref(false)
const formRef = ref<FormInstance | null>(null)

function handleVisible(show: boolean) {
    visible.value = show
    if (props.outFormData?.id) {
        title.value = '编辑菜单'
    }
    if (!show)
        formRef.value?.resetFields()
}

async function handleSubmit() {
    await formRef.value!.validate()
    if (!formState.value.id) {
        await addMenu(formState.value)
        message.success('新增成功！')
    } else {
        await editMenu(formState.value)
        message.success('编辑成功！')
    }
    emit('ok')
    handleVisible(false)
}



</script>

<style scoped lang="less"></style>
