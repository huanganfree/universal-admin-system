<template>
  <a-config-provider :theme="{
    token: {
      colorPrimary: '#00b96b',
    },
  }" :locale="zhCN">
    <RouterView />
  </a-config-provider>
</template>

<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN';
</script>
