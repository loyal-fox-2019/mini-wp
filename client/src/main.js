import Vue from 'vue'
import App from './App.vue'
// import router from './router'
import BootstrapVue from 'bootstrap-vue'
import wysiwyg from "vue-wysiwyg"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/style-default.css'
import 'vue-wysiwyg/dist/vueWysiwyg.css'

Vue.use(BootstrapVue)
Vue.use(wysiwyg, {})

new Vue({
  // router,
  render: h => h(App)
}).$mount('#app')