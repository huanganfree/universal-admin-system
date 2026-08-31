<template>
    <a-flex :gap="10" vertical>
        <a-card :bordered="false" style="flex: 1;">
            暂未开放
        </a-card>
    </a-flex>
</template>
<script lang="ts" setup>
import { Empty } from 'ant-design-vue';
const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
</script>