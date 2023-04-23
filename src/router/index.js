import { createRouter, createWebHistory } from 'vue-router'
import CommandView from '../views/CommandView.vue'
import AboutView from '../views/AboutView.vue'
import AuthView from '../views/AuthView.vue'
import LoginView from '@/views/LoginView.vue'
import { headers, UserAPI } from '@/endpoints'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'command',
      component: CommandView
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
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

  const token = localStorage.getItem("access_token");
  if (token) {
    headers.token = token;
    // check if access token is valid
/*     try {
      await UserAPI.validateToken();
      isAuthenticated = true
    } catch(e) {
      console.log(e)
      localStorage.removeItem("access_token");
    } */
    isAuthenticated = true
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
