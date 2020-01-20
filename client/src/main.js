import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import GSignInButton from 'vue-google-signin-button'

Vue.use(GSignInButton)

Vue.use(BootstrapVue)
Vue.use(VueQuillEditor)


new Vue({
    render: h => h(App)
}).$mount('#app')

