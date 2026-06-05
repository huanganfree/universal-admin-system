<template>
    <a-upload v-model:file-list="fileList" name="file" :max-count="1" action="" :beforeUpload="beforeUpload"
        :customRequest="handleUploadFile" accept="image/*">
        <a-button>
            <upload-outlined></upload-outlined>
            点击上传
        </a-button>
    </a-upload>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { UploadOutlined } from '@ant-design/icons-vue';
import { fetchUploadFile } from '@/api/content/content';

const fileList = defineModel<object[]>('fileList', { default: [], required: true })

const handleUploadFile = async ({ file }: { file: File }) => {
    const formData = new FormData()
    formData.append('file', file)
    try {
        const { filePath, originalname } = await fetchUploadFile(formData)
        fileList.value = [
            {
                uid: filePath,
                name: originalname,
                status: 'done',
            }
        ]
    } catch (error) {
        fileList.value = []
    }

};

function beforeUpload(file: File) {
}

</script>