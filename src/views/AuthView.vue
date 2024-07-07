<script setup>
import { useUserInfoStore } from '@/stores/userInfo'
import { mapWritableState } from 'pinia'
import { UserAPI, headers } from '@/endpoints'
import oidc from '@/oidc'
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
            const params = new URLSearchParams(window.location.hash)

            if(params.get('state') != oidc.state)
                throw new Error('invalid token');
            
            const claims = oidc.parseJwt(params.get('id_token'));
            console.log(claims);

            if(claims.nonce != oidc.nonce)
                throw new Error('invalid token');
    
            const userStore = useUserInfoStore()

            // set token
            const token = params.get('#access_token')
            headers.token = token

            localStorage.setItem('access_token', token)

            const userInfo = (await UserAPI.getUserInfo()).data;
            userStore.updateUserInfo(({ ...userInfo, username: claims.preferred_username }))

            this.$router.push('/')
        } catch (e) {
            console.log(e)
        }
    }
}
</script>
