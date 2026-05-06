import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/components/Layout.vue'
import System from '@/views/system/system.vue'
 
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {  
      path: '/',
      name: 'layout',
      component: Layout,
      redirect: '/system',
      children: [
        {
          path: '/system',
          name: 'system',
          component: System,  
        }
      ]
    }
  ],
})

export default router
