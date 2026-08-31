import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue';
import * as antdvIcons from '@ant-design/icons-vue'
import 'ant-design-vue/dist/reset.css';
import '@/assets/main.css'
import 'vditor/dist/index.css';

import App from './App.vue'
import router from './router'
import { permissionsDirective } from './directives/permissions.ts';

const antIcons: Record<string, any> = antdvIcons;

const app = createApp(App)

app.directive('permissions', permissionsDirective)

Object.keys(antIcons).forEach(key => {
    app.component(key, antIcons[key])
})
app.use(createPinia()).use(router).use(Antd)

app.mount('#app') 
