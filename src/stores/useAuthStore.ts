import { fetchGetUserInfo, fetchGetUserMenus } from '@/api/login/login';
import router from '@/router'
import { flatToTree, type MenuNode } from '@/utils/utilFunc';
import { defineStore } from 'pinia'

export interface AuthState {
  accessToken: string | null;
  userInfo: {
    phone: string,
    username: string,
    avatar: string,
    roleName: string
  },
  menus: MenuNode[],
  // permissionBtns: unknown[]
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    accessToken: '',
    userInfo: {
      phone: '',
      username: '',
      avatar: '',
      roleName: ''
    },
    menus: [], // 菜单权限
    // permissionBtns: [] // 按钮权限
  }),
  getters: {

  },
  actions: {
    async getUserInfo() {
      const res = await fetchGetUserInfo()
      this.userInfo = res
    },
    // 获取用户菜单和按钮权限
    // async getUserMenus() {
    //   const res = await fetchGetUserMenus()
    //   const menusData = res.filter((item: MenuNode) => item.type == 1)
    //   this.permissionBtns = res.filter((item: MenuNode) => item.type == 2)
    //   this.menus = flatToTree(menusData)
    // },
    getToken(authToken: string) {
      this.accessToken = authToken
      localStorage.setItem('accessToken', authToken)
    },
    deleteToken() {
      this.accessToken = null
      localStorage.clear()
      this.$reset();
      router.push('/login')
    }
  }
})
