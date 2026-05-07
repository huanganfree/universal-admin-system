<template>
    <a-dropdown>
        <a-space style="cursor: pointer;">
            <a-avatar :size="30">USER</a-avatar>
            <span>用户</span>
        </a-space>
        <template #overlay>
            <a-menu>
                <a-menu-item>
                    <UserOutlined />
                    <a href="javascript:;" class="marginLeft">个人中心</a>
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
import { LogoutOutlined, UserOutlined } from '@ant-design/icons-vue';


function handleLoginOut() {

}
</script>

<style scoped lang="less">
.marginLeft {
    margin-left: 10px;
}
</style>
