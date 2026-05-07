import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { mockRouters } from './mockRouters'
import Layout from '@/components/Layout.vue'
import NotFound from '@/views/notFound/notFound.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      redirect: '/system/menu',
      children: mockRouters
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})

export default router
