<script setup>
import { useUserInfoStore } from '@/stores/userInfo'
import { mapWritableState } from 'pinia'
import { UserAPI, headers } from '@/endpoints'
</script>

<template>
    <main></main>
</template>

<script>
export default {
    data: () => {
        return {}
    },
    async mounted() {
        try {
            const userStore = useUserInfoStore()

            const params = new URLSearchParams(window.location.hash)

            const token = params.get('#access_token')
            headers.token = token
            localStorage.setItem('access_token', token)

            userStore.setUserInfo((await UserAPI.getUserInfo()).data)

            this.$router.push('/')
        } catch (e) {
            console.log(e)
        }
    }
}
</script>
