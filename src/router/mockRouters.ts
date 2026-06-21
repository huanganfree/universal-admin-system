import { AppstoreOutlined, BookOutlined, ContainerOutlined, FileAddOutlined, FileSearchOutlined, RestOutlined, SafetyOutlined, SettingOutlined, ToolOutlined, UserAddOutlined, UsergroupAddOutlined, UserOutlined } from '@ant-design/icons-vue'

export const mockRouters = [
  {
    path: '/content',
    name: 'content',
    redirect: '/content/allContent',
    meta: { icon: BookOutlined, title: '内容管理' },
    children: [
      {
        path: '/content/allContent',
        name: 'allContent',
        meta: { icon: ContainerOutlined, title: '全部内容' },
        component: () => import('@/views/content/allContent/allContent.vue')
      },
      {
        path: '/content/pendingReview',
        name: 'pendingReview',
        meta: { icon: FileSearchOutlined, title: '待审核' },
        component: () => import('@/views/content/pendingReview/pendingReview.vue')
      },
      {
        path: '/content/createContent',
        name: 'createContent',
        meta: { icon: FileAddOutlined, title: '创建内容' },
        component: () => import('@/views/content/createContent/createContent.vue')
      },
      {
        path: '/content/recycleBin',
        name: 'recycleBin',
        meta: { icon: RestOutlined, title: '回收站' },
        component: () => import('@/views/content/recycleBin/recycleBin.vue')
      }
    ]
  },
  {
    path: '/user',
    name: 'user',
    redirect: '/user/userList',
    meta: { icon: UsergroupAddOutlined, title: '用户管理' },
    children: [
      {
        path: '/user/userList',
        name: 'userList',
        meta: { icon: UserAddOutlined, title: '用户列表' },
        component: () => import('@/views/user/user.vue')
      },
      {
        path: '/user/operateLog',
        name: 'operateLog',
        meta: { icon: ToolOutlined, title: '操作日志' },
        component: () => import('@/views/user/operateLog.vue')
      },
    ]
  },
  {
    path: '/system',
    name: 'system',
    redirect: '/system/menu',
    meta: { icon: SafetyOutlined, title: '权限管理' },
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