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
            }
        }
    },
    actions: {
        updateUserInfo(userInfo) {
            this.userInfo = {
                ...this.userInfo,
                ...userInfo
            }
        }
    },
    persist: true,
})
