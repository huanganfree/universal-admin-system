import { fetchGetUserInfo, fetchGetUserMenus, handleLogout } from '@/api/login/login';
import router from '@/router'
import { flatToTree, type MenuNode } from '@/utils/utilFunc';
import { defineStore } from 'pinia'

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  userInfo: {
    phone: string,
    username: string,
    avatar: string,
    roleName: string,
    nickname: string,
    id: number | null
  },
  menus: MenuNode[],
  // permissionBtns: unknown[]
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    accessToken: '',
    refreshToken: '',
    userInfo: {
      phone: '',
      username: '',
      avatar: '',
      roleName: '',
      nickname: '',
      id: null
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
    getToken({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) {
      this.accessToken = accessToken
      this.refreshToken = refreshToken
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
    },
    async deleteToken() {
      const r = localStorage.getItem('refreshToken') || ''
      await handleLogout({ refreshToken: r })
      localStorage.clear()
      this.$reset();
      router.push('/login')
    }
  }
})
