<template>
    <div class="loginView">
        <div class="logo-area">
            <img :src="Fire" alt="">
            <div class="login-title">UNIVADMIN</div>
        </div>
        <a-form :model="formState" class="form-wrapper" autocomplete="off" @finish="onFinish">
            <a-form-item name="username" :rules="[{ required: true, message: '请输入账号！' }]">
                <a-input v-model:value="formState.username" size="large" placeholder="输入账号" allow-clear>
                    <template #prefix>
                        <user-outlined />
                    </template>
                </a-input>
            </a-form-item>

            <a-form-item name="password" :rules="[{ required: true, message: '请输入密码！' }]">
                <a-input-password size="large" v-model:value="formState.password" placeholder="输入密码" allow-clear>
                    <template #prefix>
                        <LockOutlined />
                    </template>
                </a-input-password>
            </a-form-item>

            <a-form-item label="">
                <a-button type="primary" html-type="submit" block size="large">登录</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import Fire from '@/assets/image/fire.svg'
import { useRouter } from 'vue-router';
import { handleLogin } from '@/api/login/login';
import { useAuthStore } from '@/stores/useAuthStore';

const authStore = useAuthStore()

interface FormState {
    username: string;
    password: string;
    remember: boolean;
}

const router = useRouter()

const formState = reactive<FormState>({
    username: '',
    password: '',
    remember: true,
});
const onFinish = async (values: any) => {
    console.log('Success:', values);
    const res = await handleLogin(values)
    authStore.getToken(res)
    router.push('/')
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};
</script>
<style lang="less" scoped>
.loginView {
    padding-top: 100px;

    .logo-area {
        text-align: center;

        img {
            width: 60px;
        }

        .login-title {
            color: #999;
            text-transform: uppercase;
            margin: 15px 0;
            font: 700 200% Consolas, Monaco, monospace;
        }
    }

    .form-wrapper {
        width: 400px;
        margin: 0 auto;
    }
}
</style>