import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import VueSweetalert2 from 'vue-sweetalert2';
import GSignInButton from 'vue-google-signin-button'
import App from './App.vue';

Vue.use(GSignInButton)
Vue.use(BootstrapVue)
Vue.use(VueSweetalert2);

import 'sweetalert2/dist/sweetalert2.min.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

new Vue({
  render: h => h(App)
}).$mount('#app')