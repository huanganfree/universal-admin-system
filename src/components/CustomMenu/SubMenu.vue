<template>
    <a-sub-menu :key="item.path" :title="item.meta.title" :icon="() => h(item.meta.icon)">
        <template v-for="el in item.children">
            <a-menu-item :key="el.path" v-if="!el.children?.length" :title="el.meta.title"
                :icon="() => h(el.meta.icon)">
                <span>{{ el.meta.title }}</span>
            </a-menu-item>
            <sub-menu v-else :item="el" />
        </template>
    </a-sub-menu>
</template>

<script setup lang="ts">
import { h } from 'vue';
import SubMenu from './SubMenu.vue';

const props = withDefaults(defineProps<{ item: { [key: string]: any } }>(), {
    item: () => ({})
})
</script>

<style scoped lang="less">
.subMenu {
    // 样式代码
}
</style>
