<template>
    <a-form :model="formState" label-align="left" :label-col="{ style: { width: '90px' } }">
        <a-row :gutter="20">
            <a-col :span="6" v-for="(item, index) in visibleColumns" :key="index">
                <a-form-item :key="item.key" :label="item.title" :name="item.key">
                    <component :is="item.component" v-on="item.events || {}"
                        v-bind="item.props || item.componentProps || {}" v-model:value="formState[item.key]"
                        :allowClear="typeof item.componentProps?.allowClear == 'boolean' ? item.componentProps.allowClear : true" />
                </a-form-item>
            </a-col>
        </a-row>
    </a-form>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { DownOutlined, UpOutlined } from "@ant-design/icons-vue";

const formState = defineModel<any>({
    type: Object as () => any,
    default: () => {
    }
});

const { columns, collapsed } = defineProps({
    columns: {
        type: Array as () => any[],
        required: true,
    },
    collapsed: {
        type: Boolean,
        default: true
    }
})

const expand = ref<boolean>(false)

const visibleColumns = ref([...columns])

watch(() => expand.value, val => {
    if (expand.value) {
        visibleColumns.value = columns;
        return
    }
    visibleColumns.value = columns.slice(0, 3);
}, { immediate: true })


onMounted(async () => {
    for (const item of visibleColumns.value) {
        if (typeof item.request === "function") {
            const res = await item.request();
            item.componentProps = item.componentProps || {};
            item.componentProps.options = res?.data || [];
            item.componentProps.disabled = false;
        }
    }
})

const dynamicGrids = computed(() => {
    if (!collapsed) {
        return (4 - columns.length % 4) * 6
    }
    return expand.value ? (4 - columns.length % 4) * 6 : 6;
})


const toggleExpand = () => {
    expand.value = !expand.value;
};
</script>

<style scoped>
.ant-form {
    margin-bottom: -24px !important;
}

.query-button {
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
}
</style>

<style></style>