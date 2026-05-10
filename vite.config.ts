import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    // vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    proxy: {
      '/auth-api': {
        target: "http://localhost:8001",
        changeOrigin: true,
        ws: false,
        secure: false,
        rewrite: (path) => path.replace(/^\/auth-api/, ""),
        bypass(req, res: any, options) {
          if (options.rewrite && req.url) {
            const proxyURL = options.target + options.rewrite(req.url);
            console.log("proxyURL-api", proxyURL);
            req.headers["x-req-proxyURL"] = proxyURL; // 设置未生效
            res.setHeader("x-req-proxyURL", proxyURL); // 设置响应头可以看到
          }
        },
      }
    }
  }
})
