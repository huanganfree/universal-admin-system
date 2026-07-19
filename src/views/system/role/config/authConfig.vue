<template>
    <div class="component-name">
        <a-button type="link" @click="() => handleGetAuth()" :disabled="outFormData.status">权限</a-button>
        <a-drawer width="36%" :title="'配置权限'" @close="() => handleVisible(false)" :destroy-on-close="true"
            v-model:open="visible">
            <a-tree v-model:checkedKeys="authData" :tree-data="authOptions" defaultExpandAll v-if="authOptions.length"
                :field-names="{ title: 'name', children: 'children', key: 'id' }" blockNode checkable checkStrictly>
                <template #title="{ name, type }">
                    <span style="margin-right: 20px;">{{ name }}</span>
                    <a-tag :color="type == 1 ? 'green' : 'orange'">{{menuTypeOptions.find((item: any) => item.value ==
                        type)?.label}}</a-tag>
                </template>
            </a-tree>
            <template #extra>
                <a-space>
                    <a-button @click="() => handleVisible(false)">取消</a-button>
                    <a-button type="primary" @click="() => handleSubmit()" :loading="loading">提交</a-button>
                </a-space>
            </template>
        </a-drawer>
    </div>
</template>

<script setup lang="ts">
import { getAllMenus } from '@/api/system/menu';
import { fetchGetRoleAuth, fetchUpdateRoleAuth } from '@/api/system/role';
import { menuTypeOptions } from '@/utils/constant';
import { flatToTree } from '@/utils/utilFunc';
import { message } from 'ant-design-vue';
import { ref } from 'vue';

const props = withDefaults(
    defineProps<{
        outFormData?: { id: number, [key: string]: unknown }, // 或你真实的角色类型
    }>(),
    { outFormData: () => ({ roleName: '', roleCode: undefined, description: '', id: 0 }) }
)
const visible = ref(false)
const authData = ref<{ [key: string]: unknown }>({})
const authOptions = ref<any[]>([])
const loading = ref(false)

async function handleGetAuth() {
    handleVisible(true)
    const res = await getAllMenus({ status: 1 })
    const auths = await fetchGetRoleAuth(props.outFormData.id)
    authData.value.checked = auths
    transformData(res || [])
}

function transformData(params: any[]) {
    const res = flatToTree([...params])
    authOptions.value = res
    return res
}


function handleVisible(params: boolean) {
    visible.value = params
}

async function handleSubmit() {
    loading.value = true
    await fetchUpdateRoleAuth(props.outFormData.id, authData.value.checked as number[])
    visible.value = false
    loading.value = false
    message.success('配置成功！')
}
</script>

<style scoped lang="less">
.component-name {
    // 样式代码
}
</style>
