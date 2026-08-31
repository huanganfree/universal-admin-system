<template>
    <a-upload v-model:file-list="fileList" name="file" :max-count="1" action="" :beforeUpload="beforeUpload"
        :customRequest="handleUploadFile" accept="image/*" list-type="picture-card" class="avatar-uploader"
        :showUploadList="false">
        <img class="img" v-if="fileList[0]?.uid" :src="fileList[0]?.uid" alt="avatar" />
        <div v-else>
            <plus-outlined></plus-outlined>
        </div>
    </a-upload>
</template>
<script lang="ts" setup>
import { fetchUploadFile } from '@/api/content/content';

interface FileType {
    uid: string;
    name: string;
    status: string;
    [key: string]: any
}

const fileList = defineModel<FileType[]>('fileList', { default: [], required: true })

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

<style scoped lang="less">
.avatar-uploader {
    .img {
        width: 100%;
        height: 100%;
    }
}

.avatar-uploader>.ant-upload {
    width: 128px;
    height: 128px;
}

.ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
}
</style>