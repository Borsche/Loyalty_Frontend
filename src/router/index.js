import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import RewardsView from '@/views/RewardsView.vue'
import CommandView from '@/views/CommandView.vue'
import AuthView from '../views/AuthView.vue'
import LoginView from '@/views/LoginView.vue'
import { headers, UserAPI } from '@/endpoints'
import TradeView from '@/views/TradeView.vue'
import MessageView from '@/views/MessageView.vue'
import { useUserInfoStore } from '@/stores/userInfo'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'main',
            component: MainView
        },
        {
            path: '/login',
            name: 'Login',
            component: LoginView
        },
        {
            path: '/rewards',
            name: 'rewards',
            component: RewardsView
        },
        {
            path: '/commands',
            name: 'commands',
            component: CommandView
        },
        {
            path: '/trade',
            name: 'trade',
            component: TradeView
        },
        {
            path: '/message',
            name: 'message',
            component: MessageView
        },
        {
            path: '/auth/signinwin/home',
            name: 'auth',
            component: AuthView
        }
    ]
})

router.beforeEach(async (to, from) => {
    let isAuthenticated = false

    const token = localStorage.getItem('access_token')
    if (token) {
        headers.token = token
        // check if access token is valid
        try {
            await UserAPI.validateToken()
            isAuthenticated = true
        } catch (e) {
            console.log(e)
            localStorage.removeItem('access_token')
        }
    }

    if(isAuthenticated) {
        const userStore = useUserInfoStore()

        const userInfo = (await UserAPI.getUserInfo()).data;
        userStore.updateUserInfo((userInfo))
    }

    if (
        // make sure the user is authenticated
        !isAuthenticated &&
        // ❗️ Avoid an infinite redirect
        to.name !== 'Login' &&
        to.name !== 'auth'
    ) {
        // redirect the user to the login page
        return { name: 'Login' }
    }
})

export default router
