import { createRouter, createWebHistory } from 'vue-router'
import { mockRouters } from './mockRouters'
import Layout from '@/components/Layout.vue'
import { fetchGetUserMenus } from '@/api/login/login'
import { flatToTree, type MenuNode } from '@/utils/utilFunc'
import { useAuthStore } from '@/stores/useAuthStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      redirect: '/content/allContent',
      children: []
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/loginView.vue')
    }
  ]
})

router.isDynamicRoutesAdded = false
const modules = import.meta.glob('@/views/**/*.vue')

function addDynamicRoutes(res: MenuNode[]) {
  const menusData = res.filter((item: MenuNode) => item.type == 1).map((item: MenuNode) => {
    return {
      ...item,
      component: modules[`/src/views${item.component}.vue`],
      meta: {
        icon: item.icon,
        title: item.name
      }
    }
  })
  const permissionBtns = res.filter((item: MenuNode) => item.type == 2);
  localStorage.setItem('permissionBtns', JSON.stringify(permissionBtns));
  localStorage.setItem('menus', JSON.stringify(menusData));
  [...menusData].forEach((item: any) => {
    router.addRoute('layout', item);
  })
  // 一定要放在最后
  router.addRoute({
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/notFound/notFound.vue')
  })
  useAuthStore().menus = flatToTree([...menusData]);
}


router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('accessToken')
  const menusLocal = JSON.parse(localStorage.getItem('menus') || '[]')

  if (!token) {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
    return
  }

  if (to.path === '/login') {
    next()
    return
  }

  // 3. 已登录，但还没添加路由 → 先添加再跳转
  if (!menusLocal?.length || !router.isDynamicRoutesAdded) {
    const menusData = await fetchGetUserMenus()
    addDynamicRoutes(menusData)
    next({ ...to, replace: true })
    router.isDynamicRoutesAdded = true
    return
  }
  next()
})

export default router
