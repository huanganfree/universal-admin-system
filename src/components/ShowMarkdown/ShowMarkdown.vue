<template>
    <div class="component-name" v-html="output"></div>
</template>

<script setup lang="ts">
import { marked } from 'marked';
import { computed } from 'vue';

const props = defineProps({
    content: {
        type: String,
        default: ''
    }
})

const output = computed(() => marked(props.content))
</script>

<style scoped lang="less">

</style>
