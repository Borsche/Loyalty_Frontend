import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserInfoStore = defineStore('userInfo', {
  state: () => {
    return {
      userInfo: {
        picture: '',
        points: 0,
        role: 'USER',
        username: ''
      },
    }
  },
  getters: {
    getUserInfo(state) {
      if(!state.userInfo.username) {
        state.userInfo = JSON.parese(window.localStorage.getItem("userInfo"))
      }
      return state.userInfo;
    }
  },
  actions: {
    setUserInfo(payload) {
      this.userInfo = payload
      window.localStorage.setItem("userInfo", JSON.stringify(payload))
    }
  }
})

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      userInfo: {
        picture: '',
        points: 0,
        role: 'USER',
        username: ''
      }
    }
  }
})
