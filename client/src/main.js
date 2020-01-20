import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import wysiwyg from 'vue-wysiwyg'
import 'vue-wysiwyg/dist/vueWysiwyg.css'
import GAuth from 'vue-google-oauth2'


Vue.use(wysiwyg, { hideModules: { "images": true } })


// Install BootstrapVue
Vue.use(BootstrapVue)

new Vue({
    render: h => h(App),
}).$mount('#app')