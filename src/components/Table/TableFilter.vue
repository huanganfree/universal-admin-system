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
            <a-col :span="6">
                <a-form-item>
                    <a-space>
                        <a-button type="primary" @click="emit('search')">查询</a-button>
                        <a-button>重置</a-button>
                    </a-space>
                </a-form-item>
            </a-col>
        </a-row>
    </a-form>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";

const formState = defineModel<any>({
    type: Object as () => any,
    default: () => {
    }
});

const emit = defineEmits(['search'])

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

const visibleColumns = ref([...columns])

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