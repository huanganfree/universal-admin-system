<template>
    <a-dropdown>
        <a-space style="cursor: pointer;">
            <a-avatar :size="33" :src="authStore.userInfo.avatar">
                <!-- <template #icon>
                    <UserOutlined v-if="!authStore.userInfo.avatar" />
                </template> -->
            </a-avatar>
            <span>{{ authStore.userInfo.username }}&nbsp;({{ authStore.userInfo.roleName }})</span>
        </a-space>
        <template #overlay>
            <a-menu>
                <a-menu-item @click="handleAccountSetting">
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
    <PersonalSetting v-if="personalSettingVisible" @close="personalSettingVisible = false" />
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/useAuthStore';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons-vue';
import PersonalSetting from '../PersonalSetting/PersonalSetting.vue';
import { ref } from 'vue';

const authStore = useAuthStore()
const personalSettingVisible = ref(false)

function handleLoginOut() {
    authStore.deleteToken()
}

function handleAccountSetting() {
    personalSettingVisible.value = true
}
</script>

<style scoped lang="less">
.marginLeft {
    margin-left: 10px;
}
</style>
