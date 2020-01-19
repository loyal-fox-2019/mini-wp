import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import User from '../views/User.vue'
import LoginRegister from "../views/LoginRegister.vue";
import CreatePage from '../views/CreatePage.vue';


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login or Register',
        component: LoginRegister
    },
    {
        path: '/register',
        redirect: '/login'
    },
    {
        path: '/user',
        name: 'user page',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/User.vue')
    },
    {
        path: '/create',
        name: 'Create Page',
        component: CreatePage
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
