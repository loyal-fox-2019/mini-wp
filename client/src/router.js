import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginForm from './views/LoginForm.vue'
import LandingPage from './views/LandingPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'landingPage',
    component: LandingPage,
  },
  {
    path: '/login',
    name: 'loginPage',
    component: LoginForm,
  }
]

const router = new VueRouter({
  routes,
})

export default router
