import Vue from 'vue';
import VueRouter from 'vue-router';
import VueRouterMultiguard from 'vue-router-multiguard';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import googleMixin from './mixins/googleMixin';
import App from './App.vue';
import LoginPage from './LoginPage.vue';
import UserPage from './UserPage.vue';
import RegisterPage from './RegisterPage.vue';
 
Vue.use(VueSweetalert2);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueRouter);

const authenticate = (to, from, next) => {
  if (!localStorage.token) {
    next('/login');
  } else {
    next();
  }
}

const routes = [
  { path: '/',
    redirect: {
      name: 'login-page'
    }
  },
  { path: '/login', component: LoginPage, name: 'login-page',
    beforeEnter: (to, from, next) => {
      if (localStorage.token) {
        next('/user');
      } else {
        next();
      }
    }
  },
  { path: '/user', component: UserPage, name: 'user-page',
    beforeEnter: VueRouterMultiguard([authenticate])
  },
  { path: '/register', component: RegisterPage, name: 'register-page',
    beforeEnter: (to, from, next) => {
      if (localStorage.token) {
        next('/user');
      } else {
        next();
      }
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

// Global Variables
Vue.prototype.$baseUrl = 'http://localhost:3000';
Vue.prototype.$gAuthenticate = false;

new Vue({
  el: '#app',
  router,
  render: h => h(App),
});