import Vue from 'vue'
import VueRouter from 'vue-router'
import ArticleList from '../views/articleList.vue'
import Auth from '../views/auth.vue'
import Swal from 'sweetalert2'

Vue.use(VueRouter)

const routes = [
   {
      path: '/login',
      name: 'login',
      component: Auth
   },
   {
      path: '/register',
      name: 'register',
      component: Auth
   },
   {
      path: '/',
      name: 'articleList',
      component: ArticleList
   },
   {
      path: '/:tag',
      name: 'articleListByTag',
      component: ArticleList
   }
]

const router = new VueRouter({
   mode: 'history',
   base: process.env.BASE_URL,
   routes
})

const whitelist = [
   'register',
   'login'
]

router.beforeEach((to, from, next) => {
   if(!whitelist.includes(to.name) && !localStorage.token) {
      Swal.fire({
         position: 'center',
         icon: 'info',
         title: 'You are not logged in, redirecting...',
         showConfirmButton: false,
         timer: 1000
       })

      next({name: 'login'})
   }
   else next()
})

export default router