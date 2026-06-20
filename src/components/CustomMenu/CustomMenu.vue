<template>
    <a-menu v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys" theme="dark" mode="inline"
        class="global-menu" @select="handleMenuSelect" @openChange="handleOpen">
        <template v-for="item in menuData" :key="item.path">
            <a-menu-item v-if="!item.children?.length" :key="item.path" :title="item.meta.title"
                :icon="() => h(item.meta.icon)">
                <span>{{ item.meta.title }}</span>
            </a-menu-item>
            <sub-menu v-else :key="item.path + '-sub'" :item="item" />
        </template>
    </a-menu>
</template>

<script setup lang="ts">
import { h, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SubMenu from './SubMenu.vue';
import { mockRouters } from '@/router/mockRouters';

const route = useRoute();
const router = useRouter();
const emit = defineEmits(['breadcrumb-change']);

const menuData = ref(mockRouters);
const selectedKeys = ref<string[]>([]);
const openKeys = ref<string[]>([]);

// 监听路由变化：同步菜单高亮、展开状态和面包屑
watch(
    () => route.path,
    (newPath) => {
        selectedKeys.value = [newPath];
        // 自动根据当前路由匹配并展开父级菜单
        const parentPath = route.matched[route.matched.length - 2]?.path;
        if (parentPath && !openKeys.value.includes(parentPath)) {
            openKeys.value = [parentPath];
        }
        emit('breadcrumb-change', route.matched);
    },
    { immediate: true }
);

function handleMenuSelect({ key }: { key: string }) {
    router.push(key);
}

// 手动切换折叠时：手风琴模式（只保留当前展开的顶级菜单）
function handleOpen(open: string[]) {
    if (open.length === 0) {
        openKeys.value = [];
        return;
    }
    openKeys.value = [open[open.length - 1]!];
}
</script>

<style scoped lang="less"></style>