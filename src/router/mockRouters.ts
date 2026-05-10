import { AppstoreOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons-vue'

export const mockRouters = [
  {
    path: '/system',
    name: 'system',
    redirect: '/system/menu',
    meta: { icon: SettingOutlined, title: '系统管理' },
    children: [
      {
        path: '/system/role',
        name: 'role',
        meta: { icon: UserOutlined, title: '角色管理' },
        component: () => import('@/views/system/role/role.vue')
      },
      {
        path: '/system/menu',
        name: 'menu',
        meta: { icon: AppstoreOutlined, title: '菜单管理' },
        component: () => import('@/views/system/menu.vue')
      },
    ]
  }
] 