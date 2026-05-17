<template>
    <a-dropdown>
        <a-space style="cursor: pointer;">
            <a-avatar :size="33" src="">
                <template #icon>
                    <UserOutlined />
                </template></a-avatar>
            <span>小帅&nbsp;(超级管理员)</span>
        </a-space>
        <template #overlay>
            <a-menu>
                <a-menu-item>
                    <UserOutlined />
                    <a href="javascript:;" class="marginLeft">账号设置</a>
                </a-menu-item>
                <a-menu-item>
                    <LogoutOutlined />
                    <a href="javascript:;" class="marginLeft" @click="handleLoginOut">退出登录</a>
                </a-menu-item>
            </a-menu>
        </template>
    </a-dropdown>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/useAuthStore';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons-vue';

const authStore = useAuthStore()
function handleLoginOut() {
    authStore.deleteToken()
}
</script>

<style scoped lang="less">
.marginLeft {
    margin-left: 10px;
}
</style>
