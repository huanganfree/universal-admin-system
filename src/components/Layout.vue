<template>
    <a-layout class="global-layout">
        <a-layout-sider v-model:collapsed="collapsed" collapsible>
            <div class="logo" />
            <CustomMenu @breadcrumb-change="handleBread" />
        </a-layout-sider>
        <a-layout>
            <a-layout-header class="global-layout-header">
                <a-breadcrumb>
                    <a-breadcrumb-item v-for="item in breadcrumbData" :key="item.path">{{ item.meta.title
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
import { ref } from 'vue';
import CustomMenu from './CustomMenu/CustomMenu.vue';
import { RouterView } from 'vue-router';
import Avatar from './Avatar/Avatar.vue';

const breadcrumbData = ref<{ [key: string]: any }>([])
const collapsed = ref<boolean>(false);

function handleBread(params: any) {
    breadcrumbData.value = params.slice(1)
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
    margin: 16px;
    // padding: 16px;
    // background: #fff;
    height: 100%;
    overflow: auto;
}
</style>