<template>
    <a-sub-menu :key="item.path" :title="item.meta.title" :icon="() => h(resolveIcon(item.meta.icon))">
        <template v-for="el in item.children">
            <a-menu-item :key="el.path" v-if="!el.children?.length" :title="el.meta.title"
                :icon="() => h(resolveIcon(el.meta.icon))">
                <span>{{ el.meta.title }}</span>
            </a-menu-item>
            <sub-menu v-else :item="el" />
        </template>
    </a-sub-menu>
</template>

<script setup lang="ts">
import { h } from 'vue';
import SubMenu from './SubMenu.vue';
import * as Icons from '@ant-design/icons-vue'
import type { MenuNode } from '@/utils/utilFunc'

type IconName = keyof typeof Icons

function resolveIcon(name: string) {
    return Icons[name as IconName]
}

withDefaults(defineProps<{ item: MenuNode }>(), {
    item: () => ({}) as MenuNode
})
</script>

<style scoped lang="less"></style>
