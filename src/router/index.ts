import { createRouter, createWebHistory } from 'vue-router'
import { mockRouters } from './mockRouters'
import Layout from '@/components/Layout.vue'

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
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/loginView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/notFound/notFound.vue')
    }
  ]
})

export default router
