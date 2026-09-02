import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    base: env.VITE_PUBLIC_PATH,
    plugins: [
      vue(),
      vueJsx(),
      // vueDevTools(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      port: 9000,
      proxy: {
        '/auth-api': {
          target: 'http://localhost:8001',
          changeOrigin: true,
          ws: false,
          secure: false,
          rewrite: (path) => path.replace(/^\/auth-api/, ''),
          bypass(req, res: any, options) {
            if (options.rewrite && req.url) {
              const proxyURL = options.target + options.rewrite(req.url)
              console.log('proxyURL-api', proxyURL)
              req.headers['x-req-proxyURL'] = proxyURL // 设置未生效
              res.setHeader('x-req-proxyURL', proxyURL) // 设置响应头可以看到
            }
          },
        },
        '/system-api': {
          target: 'http://localhost:8001',
          changeOrigin: true,
          ws: false,
          secure: false,
          rewrite: (path) => path.replace(/^\/system-api/, ''),
          bypass(req, res: any, options) {
            if (options.rewrite && req.url) {
              const proxyURL = options.target + options.rewrite(req.url)
              console.log('proxyURL-api', proxyURL)
              req.headers['x-req-proxyURL'] = proxyURL // 设置未生效
              res.setHeader('x-req-proxyURL', proxyURL) // 设置响应头可以看到
            }
          },
        },
        '/content-api': {
          target: 'http://localhost:8001',
          changeOrigin: true,
          ws: false,
          secure: false,
          rewrite: (path) => path.replace(/^\/content-api/, ''),
          bypass(req, res: any, options) {
            if (options.rewrite && req.url) {
              const proxyURL = options.target + options.rewrite(req.url)
              console.log('proxyURL-api', proxyURL)
              req.headers['x-req-proxyURL'] = proxyURL // 设置未生效
              res.setHeader('x-req-proxyURL', proxyURL) // 设置响应头可以看到
            }
          },
        },
      },
    },
  }
})
