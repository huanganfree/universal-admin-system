<template>
    <a-layout class="global-layout">
        <a-layout-sider v-model:collapsed="collapsed" collapsible>
            <div class="logo" />
            <CustomMenu />
        </a-layout-sider>
        <a-layout>
            <a-layout-header class="global-layout-header">
                <a-breadcrumb>
                    <a-breadcrumb-item>Home</a-breadcrumb-item>
                    <a-breadcrumb-item><a>Application Center</a></a-breadcrumb-item>
                    <a-breadcrumb-item><a>Application List</a></a-breadcrumb-item>
                    <a-breadcrumb-item>An Application</a-breadcrumb-item>
                </a-breadcrumb>
                <a-space>
                    <a-switch v-model:checked="themeChecked" checked-children="深色" un-checked-children="浅色" />
                </a-space>
            </a-layout-header>
            <a-layout-content class="global-layout-content">
                <router-view />
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import CustomMenu from './CustomMenu.vue';
import { RouterView } from 'vue-router';
const selectedKeys = ref<string[]>(['1']);
const collapsed = ref<boolean>(false);

const themeChecked = ref('')
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
}

.global-layout-content {
    margin: 16px;
    padding: 16px;
    background: #fff;
    height: 100%;
    overflow: auto;
}
</style>