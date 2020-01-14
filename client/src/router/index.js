import Vue from 'vue'
import VueRouter from 'vue-router'
import ArticleList from '../views/articleList.vue'
import Auth from '../views/auth.vue'

Vue.use(VueRouter)

const routes = [
   {
      path: '/login',
      name: login,
      component: Auth
   },
   {
      path: '/register',
      name: register,
      component: Auth
   },
   {
      path: '/',
      name: 'ArticleList',
      component: ArticleList
   }
]

const router = new VueRouter({
   mode: 'history',
   base: process.env.BASE_URL,
   routes
 })

export default router