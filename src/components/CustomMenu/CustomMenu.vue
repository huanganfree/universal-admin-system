<template>
    <a-menu v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys" theme="dark" mode="inline"
        class="global-menu" @select="handleMenuSelect">
        <template v-for="item in menuData">
            <a-menu-item :key="item.path" v-if="!item.children?.length" :title="item.meta.title"
                :icon="() => h(item.meta.icon)">
                <span>{{ item.meta.title }}</span>
            </a-menu-item>
            <sub-menu v-else :item="item" />
        </template>
    </a-menu>
</template>

<script setup lang="ts">
import { h, ref, watch } from 'vue';
import SubMenu from './SubMenu.vue';
import { mockRouters } from '@/router/mockRouters';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const selectedKeys = ref<string[]>(['/system/role'])
const openKeys = ref(['/system'])
const menuData = ref(mockRouters)
const emit = defineEmits(['breadcrumb-change'])

watch(() => route.path, () => {
    emit('breadcrumb-change', route.matched)
}, { immediate: true })

initData()
function initData() {
    router.push(selectedKeys.value[0]!)
}

function handleMenuSelect({ key }: { key: string }) {
    router.push(key)
}

</script>

<style scoped lang="less"></style>
