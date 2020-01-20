import Vue from "vue";
import App from "./App.vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import GSignInButton from 'vue-google-signin-button'
import VueSweetalert2 from 'vue-sweetalert2';

Vue.use(VueSweetalert2);
Vue.use(GSignInButton)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css';
import './components/assets/styles/main.css'

new Vue({
    render: h => h(App),
}).$mount('#app')
