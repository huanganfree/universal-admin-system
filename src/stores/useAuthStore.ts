import { fetchGetUserInfo } from '@/api/login/login';
import router from '@/router'
import { defineStore } from 'pinia'

export interface AuthState {
  accessToken: string | null;
  userInfo: {
    phone: string,
    username: string,
    avatar: string,
    roleName: string
  }
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    accessToken: '',
    userInfo: {
      phone: '',
      username: '',
      avatar: '',
      roleName: ''
    }
  }),
  getters: {

  },
  actions: {
    async getUserInfo() {
      const res = await fetchGetUserInfo()
      this.userInfo = res
    },
    getToken(authToken: string) {
      this.accessToken = authToken
      localStorage.setItem('accessToken', authToken)
    },
    deleteToken() {
      this.accessToken = null
      localStorage.removeItem('accessToken')
      router.push('/login')
    }
  }
})
