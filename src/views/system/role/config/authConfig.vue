<template>
    <div class="component-name">
        <a-button type="link" @click="() => handleVisible(true)" :disabled="outFormData.status">权限</a-button>
        <a-drawer width="30%" :title="'配置权限'" @close="() => handleVisible(false)" :destroy-on-close="true"
            v-model:open="visible">
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
import { ref } from 'vue';

const props = withDefaults(
    defineProps<{
        outFormData?: { [key: string]: unknown }, // 或你真实的角色类型
    }>(),
    { outFormData: () => ({ roleName: '', roleCode: undefined, description: '' }) }
)
const visible = ref(false)

function handleVisible(params: boolean) {
    visible.value = params
}

function handleSubmit() {

}
</script>

<style scoped lang="less">
.component-name {
    // 样式代码
}
</style>
