<template>
    <div>
        <div class="markdownEditor" ref="markdownEditorRef" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import Vditor from 'vditor';
import { message } from 'ant-design-vue';

const props = withDefaults(defineProps<{
    disabled?: boolean,
    underlineVisible?: boolean
}>(), {
    disabled: false,
    underlineVisible: true
})
let vditor = null
const emit = defineEmits(['update:modelValue'])
const content = defineModel('content', { default: '' })

const markdownEditorRef = ref<HTMLDivElement | null>(null)

watch(() => content.value, val => {
    if (content.value) {
        initVditor()
    }
}, { immediate: true })

watch(() => props.disabled, val => {
    if (val && markdownEditorRef.value) {
        vditor!.disabled()
    }
}, { immediate: true })

onMounted(() => {
    initVditor()
})

function initVditor() {
    vditor = new Vditor(markdownEditorRef.value!, {
        width: '100%',
        height: '350px',
        cache: {
            enable: false
        },
        mode: 'sv',
        placeholder: '请输入...',
        toolbar: [
            "emoji",
            "headings",
            "bold",
            "italic",
            "strike",
            // "link",
            "|",
            "list",
            "ordered-list",
            "check",
            "outdent",
            "indent",
            "|",
            "quote",
            "line",
            "code",
            "inline-code",
            "insert-before",
            "insert-after",
            "|",
            {
                name: "upload",
                tip: '上传图片或者音频'
            },
            "|",
            "fullscreen"
        ],
        value: '',
        preview: {
            mode: 'both',
            actions: [{
                key: '1',
                text: '即时预览',
                tooltip: '',
                className: 'markdown-preview',
                click: () => ({})
            }]  // 隐藏预览区域顶部的工具栏（Desktop/Tablet/Mobile/Wechat等选项）
        },
        blur(value) {
            console.log(value);
            if (value == '\n') {// 特殊处理下
                content.value = ''
            } else {
                content.value = value
            }
            emit('update:modelValue', content.value) // 兼容之前封装的Editor组件的api
        },
        after() {
            vditor!.setValue(content.value)
            if (props.disabled) {
                vditor!.disabled()
            }
        },
        upload: {
            headers: {
                Authorization: "Bearer "
            },
            fieldName: 'file',
            accept: "image/*, audio/*", // 图片和音频
            multiple: false,
            url: `${import.meta.env.VITE_FILEMANAGE_PREFIX_API}/storage/upload`,
            linkToImgUrl: `${import.meta.env.VITE_FILEMANAGE_PREFIX_API}/storage/upload`,
            format(files, responseText) {
                const { data = {}, status } = JSON.parse(responseText || '{}')
                let stringRes = null
                if (status == 200) {
                    stringRes = {
                        "msg": "",
                        "code": 0,
                        "data": {
                            "succMap": {
                                [data.objectName]: data.objectUrl,
                            }
                        }
                    }
                } else {
                    message.error('上传失败！')
                }
                const finalRes: string = JSON.stringify(stringRes)
                return finalRes
            },
            error(msg) {
                message.error(msg || '上传失败！')
            },
            // async handler(files) {
            //     const formData = new FormData()
            //     formData.append('file', files[0])
            //     return await FetchUploadFileSync(formData)
            // },
        }
    })
}

</script>

<style scoped lang="less">
.markdownEditor {
    width: 100%;
    height: 350px;
    width: 100%;
    height: 350px;

    .markdown-preview {
        font-size: 16px;
        color: black;
    }
}
</style>
