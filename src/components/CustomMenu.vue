<template>
    <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline" class="global-menu">
        <a-menu-item key="1">
            <setting-outlined />
            <span>系统管理</span>
        </a-menu-item>
    </a-menu>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    SettingOutlined,
} from '@ant-design/icons-vue';

const selectedKeys = ref(['1'])
</script>

<style scoped lang="less"></style>
