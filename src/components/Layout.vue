<template>
    <a-layout class="global-layout">
        <a-layout-sider v-model:collapsed="collapsed" collapsible>
            <div class="logo" />
            <CustomMenu @breadcrumb-change="handleBread" />
        </a-layout-sider>
        <a-layout>
            <a-layout-header class="global-layout-header">
                <a-breadcrumb>
                    <a-breadcrumb-item v-for="item in breadcrumbData" :key="item.path">{{ item.meta?.title
                    }}</a-breadcrumb-item>
                </a-breadcrumb>
                <Avatar />
            </a-layout-header>
            <a-layout-content class="global-layout-content">
                <router-view />
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import CustomMenu from './CustomMenu/CustomMenu.vue';
import { RouterView } from 'vue-router';
import Avatar from './Avatar/Avatar.vue';
import { useAuthStore } from '@/stores/useAuthStore.ts';

const breadcrumbData = ref<{ [key: string]: any }>([])
const collapsed = ref<boolean>(false);

onMounted(() => {
    useAuthStore().getUserInfo();
})

function handleBread(params: any[]) {
    breadcrumbData.value = params
}
</script>
<style lang="less" scoped>
.global-layout {
    height: 100vh;

    .global-menu {
        height: 100%;
    }
}

.global-layout-header {
    background: #fff;
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ededed;
}

.global-layout-content {
    margin: 16px 0 16px 16px;
    padding-right: 8px;
    // background: #fff;
    height: 100%;
    overflow: auto;
}
</style>