import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue';
import * as antdvIcons from '@ant-design/icons-vue'
import 'ant-design-vue/dist/reset.css';
import '@/assets/main.css'

import App from './App.vue'
import router from './router'

const antIcons: Record<string, any> = antdvIcons;

const app = createApp(App)

Object.keys(antIcons).forEach(key => {
    app.component(key, antIcons[key])
})
app.use(createPinia()).use(router).use(Antd)

app.mount('#app') 
