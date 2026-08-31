<template>
    <div class="loginView">
        <div class="logo-area">
            <img :src="Fire" alt="">
            <div class="login-title">UNIVADMIN</div>
        </div>
        <a-form :model="formState" class="form-wrapper" autocomplete="off" @finish="onFinish">
            <a-form-item name="phone" :rules="[{ required: true, message: '请输入手机号！' }]">
                <a-input v-model:value="formState.phone" size="large" placeholder="输入手机号" allow-clear :maxlength="11">
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
                <a-button type="primary" html-type="submit" block size="large" :loading="loading">登录</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>
<script lang="ts" setup>
import { onBeforeMount, reactive, ref } from 'vue';
import Fire from '@/assets/image/fire.svg'
import { useRouter } from 'vue-router';
import { handleLogin } from '@/api/login/login';
import { useAuthStore } from '@/stores/useAuthStore';

const authStore = useAuthStore()

interface FormState {
    phone: string;
    password: string;
    remember: boolean;
}

const router = useRouter()

const loading = ref(false)

onBeforeMount(() => {
    localStorage.clear()
})
const formState = reactive<FormState>({
    phone: '',
    password: '',
    remember: true,
});
const onFinish = async (values: any) => {
    console.log('Success:', values);
    try {
        loading.value = true
        const res = await handleLogin(values)
        authStore.getToken(res)
        // 跳转全部内容
        router.push('/')
    } catch (error) {

    } finally {
        loading.value = false
    }

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