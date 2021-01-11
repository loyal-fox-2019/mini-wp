import Vue from 'vue'
import App from './App.vue'
// import router from './router'
import BootstrapVue from 'bootstrap-vue'
import wysiwyg from "vue-wysiwyg"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/style-default.css'
import 'vue-wysiwyg/dist/vueWysiwyg.css'
import GAuth from 'vue-google-oauth2'

const gauthOption = {
  clientId: '135275767764-8v6d03qgam3pg4j77msdftti1nk0nd9l.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)
Vue.use(BootstrapVue)
Vue.use(wysiwyg, {hideModules: { "image": true }})

new Vue({
  // router,
  render: h => h(App)
}).$mount('#app')