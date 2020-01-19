import Vue from 'vue';
import App from './App.vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueQuill from 'vue-quill';
import GSignInButton from 'vue-google-signin-button'
import GAuth from 'vue-google-oauth2'

const gauthOption = {
    clientId: '584514161670-6ptkhqmvh598080ogso97mdgkbr4tmd7.apps.googleusercontent.com'
}

Vue.use(GAuth, gauthOption)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(GSignInButton)
Vue.use(VueQuill)

new Vue({
    render: h => h(App),
}).$mount('#app');