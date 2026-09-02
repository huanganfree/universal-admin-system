// src/utils/image.ts
const IMG_BASE_URL = import.meta.env.VITE_GLOB_IMG_URL;

/**
 * 格式化图片路径，自动补全域名/子路径前缀
 */
export function getImageUrl(path?: string): string {
    if (!path) return '';
    // 如果是网络绝对路径 (http/https) 或 base64，直接返回
    if (/^(http|https|data:image)/.test(path)) {
        return path;
    }
    // 确保 path 开头有 /
    const formattedPath = path.startsWith('/') ? path : `/${path}`;
    return `${IMG_BASE_URL}${formattedPath}`;
}