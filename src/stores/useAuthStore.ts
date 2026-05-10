import { defineStore } from 'pinia'

export interface AuthState {
  accessToken: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    accessToken: ''
  }),
  getters: {

  },
  actions: {
    getToken(authToken: string) {
      this.accessToken = authToken
      localStorage.setItem('accessToken', authToken)
    },
    deleteToken() {
      this.accessToken = null
      localStorage.removeItem('accessToken')
    }
  }
})
