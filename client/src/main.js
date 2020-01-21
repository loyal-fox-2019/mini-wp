import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import wysiwyg from 'vue-wysiwyg'
import 'vue-wysiwyg/dist/vueWysiwyg.css'
import GSignInButton from 'vue-google-signin-button'
import GAuth from 'vue-google-oauth2'


Vue.use(wysiwyg, { hideModules: { "images": true } })

const gauthOption = {
    clientId: '207996428099-kl48h5f1798lthb5t350larru0bfveev.apps.googleusercontent.com'
}
Vue.prototype.$googleId = '207996428099-kl48h5f1798lthb5t350larru0bfveev.apps.googleusercontent.com'
Vue.use(GAuth, gauthOption)
Vue.use(GSignInButton)

// Install BootstrapVue
Vue.use(BootstrapVue)

new Vue({
    render: h => h(App),
}).$mount('#app')