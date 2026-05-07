<template>
    <a-empty :image-style="{
        height: '260px',
    }" description="">
        <template #image>
            <img :src="NOtFound" alt="">
        </template>
        <a-button type="primary" @click="() => router.push('/')">返回主页</a-button>
    </a-empty>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import NOtFound from '@/assets/image/notFound.svg';

const router = useRouter()
</script>

<style scoped lang="less">
.not-found {
    // 样式代码
}
</style>
